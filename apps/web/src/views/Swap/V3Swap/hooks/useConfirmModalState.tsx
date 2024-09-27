import { ChainId } from '@pancakeswap/chains'
import { Currency, CurrencyAmount } from '@pancakeswap/swap-sdk-core'
import { ethereumTokens } from '@pancakeswap/tokens'
import { ApprovalState } from 'hooks/useApproveCallback'
import { useCallback, useEffect, useState } from 'react'
import { ConfirmModalState, PendingConfirmModalState } from 'views/Swap/V3Swap/types'
import { SendTransactionResult } from 'wagmi/actions'
import { usePublicNodeWaitForTransaction } from 'hooks/usePublicNodeWaitForTransaction'
import { TransactionRejectedError } from './useSendSwapTransaction'

interface UseConfirmModalStateProps {
  txHash?: string
  chainId?: ChainId
  approval: ApprovalState
  approvalToken?: Currency
  isPendingError: boolean
  isExpertMode: boolean
  currentAllowance?: CurrencyAmount<Currency>
  onConfirm: () => Promise<void>
  approveCallback: () => Promise<SendTransactionResult>
  revokeCallback: () => Promise<SendTransactionResult>
}

function isInApprovalPhase(confirmModalState: ConfirmModalState) {
  return (
    confirmModalState === ConfirmModalState.APPROVING_TOKEN || confirmModalState === ConfirmModalState.APPROVE_PENDING
  )
}
export const useConfirmModalState = ({
  chainId,
  txHash,
  approval,
  approvalToken,
  isPendingError,
  currentAllowance,
  onConfirm,
  approveCallback,
  revokeCallback,
}: UseConfirmModalStateProps) => {
  const { waitForTransaction } = usePublicNodeWaitForTransaction()
  const [confirmModalState, setConfirmModalState] = useState<ConfirmModalState>(ConfirmModalState.REVIEWING)
  const [pendingModalSteps, setPendingModalSteps] = useState<PendingConfirmModalState[]>([])
  const [previouslyPending, setPreviouslyPending] = useState<boolean>(false)
  const [resettingApproval, setResettingApproval] = useState<boolean>(false)

  const generateRequiredSteps = useCallback(() => {
    const steps: PendingConfirmModalState[] = []

    // Any existing USDT allowance needs to be reset before we can approve the new amount (mainnet only).
    // See the `approve` function here: https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7#code
    if (
      approval === ApprovalState.NOT_APPROVED &&
      currentAllowance?.greaterThan(0) &&
      approvalToken &&
      approvalToken.chainId === ethereumTokens.usdt.chainId &&
      approvalToken.wrapped.address.toLowerCase() === ethereumTokens.usdt.address.toLowerCase()
    ) {
      steps.push(ConfirmModalState.RESETTING_APPROVAL)
    }

    if (approval === ApprovalState.NOT_APPROVED) {
      setPreviouslyPending(false)
      steps.push(ConfirmModalState.APPROVING_TOKEN, ConfirmModalState.APPROVE_PENDING)
    }

    steps.push(ConfirmModalState.PENDING_CONFIRMATION)
    return steps
  }, [approval, approvalToken, currentAllowance])

  const onCancel = useCallback(() => {
    setConfirmModalState(ConfirmModalState.REVIEWING)
    setPreviouslyPending(false)
  }, [])

  const resetSwapFlow = useCallback(() => {
    setConfirmModalState(ConfirmModalState.REVIEWING)
    setPendingModalSteps([])
    setPreviouslyPending(false)
    setResettingApproval(false)
  }, [])

  const performStep = useCallback(
    async (step: ConfirmModalState) => {
      switch (step) {
        case ConfirmModalState.RESETTING_APPROVAL:
          setConfirmModalState(ConfirmModalState.RESETTING_APPROVAL)
          revokeCallback()
            .then(() => setResettingApproval(true))
            .catch(() => onCancel())
          break
        case ConfirmModalState.APPROVING_TOKEN:
          setConfirmModalState(ConfirmModalState.APPROVING_TOKEN)
          approveCallback()
            .then(() => setConfirmModalState(ConfirmModalState.APPROVE_PENDING))
            .catch(() => onCancel())
          break
        case ConfirmModalState.PENDING_CONFIRMATION:
          setConfirmModalState(ConfirmModalState.PENDING_CONFIRMATION)
          try {
            await onConfirm()
          } catch (error) {
            if (error instanceof TransactionRejectedError) {
              resetSwapFlow()
            }
          }
          break
        case ConfirmModalState.COMPLETED:
          setConfirmModalState(ConfirmModalState.COMPLETED)
          break
        default:
          setConfirmModalState(ConfirmModalState.REVIEWING)
          break
      }
    },
    [approveCallback, revokeCallback, onConfirm, onCancel, resetSwapFlow],
  )

  const startSwapFlow = useCallback(() => {
    const steps = generateRequiredSteps()
    setPendingModalSteps(steps)
    performStep(steps[0])
  }, [generateRequiredSteps, performStep])

  const checkHashIsReceipted = useCallback(
    async (hash) => {
      const receipt: any = await waitForTransaction({ hash, chainId })
      if (receipt.status === 'success') {
        performStep(ConfirmModalState.COMPLETED)
      }
    },
    [performStep, waitForTransaction, chainId],
  )

  useEffect(() => {
    if (approval === ApprovalState.NOT_APPROVED && resettingApproval) {
      startSwapFlow()
      setResettingApproval(false)
    }
  }, [approval, resettingApproval, performStep, startSwapFlow])

  useEffect(() => {
    if (approval === ApprovalState.PENDING && confirmModalState === ConfirmModalState.APPROVE_PENDING) {
      setPreviouslyPending(true)
    }
  }, [approval, confirmModalState])

  // Submit Approve but after submit find out still not enough.
  useEffect(() => {
    if (
      previouslyPending &&
      approval === ApprovalState.NOT_APPROVED &&
      confirmModalState === ConfirmModalState.APPROVE_PENDING
    ) {
      onCancel()
    }
  }, [approval, confirmModalState, previouslyPending, onCancel])

  // Submit Approve, get error when submit approve.
  useEffect(() => {
    if (isPendingError && confirmModalState === ConfirmModalState.APPROVE_PENDING) {
      onCancel()
    }
  }, [isPendingError, confirmModalState, previouslyPending, onCancel])

  useEffect(() => {
    if (isInApprovalPhase(confirmModalState) && approval === ApprovalState.APPROVED) {
      performStep(ConfirmModalState.PENDING_CONFIRMATION)
    }
  }, [approval, confirmModalState, performStep])

  useEffect(() => {
    if (txHash && confirmModalState === ConfirmModalState.PENDING_CONFIRMATION && approval === ApprovalState.APPROVED) {
      checkHashIsReceipted(txHash)
    }
  }, [approval, txHash, confirmModalState, checkHashIsReceipted, performStep])

  return { confirmModalState, pendingModalSteps, startSwapFlow, resetSwapFlow }
}
