import { useState, useEffect } from 'react'
import BigNumber from 'bignumber.js'
import { useTranslation } from '@pancakeswap/localization'
import {
  Modal,
  Text,
  Flex,
  BalanceInput,
  CopyAddress,
  Box,
  FlexGap,
  Button,
  LogoRoundIcon,
  useToast,
  Heading,
} from '@pancakeswap/uikit'
import { useAccount } from 'wagmi'
import { formatNumber, getBalanceAmount, getBalanceNumber } from '@pancakeswap/utils/formatBalance'
import useTheme from 'hooks/useTheme'
import useTokenBalance from 'hooks/useTokenBalance'
import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransaction'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import ConnectWalletButton from 'components/ConnectWalletButton'
import ApproveConfirmButtons, { ButtonArrangement } from 'components/ApproveConfirmButtons'
import { ConnectedBidder, FetchStatus } from 'config/constants/types'
import { useCakePrice } from 'hooks/useCakePrice'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import { bscTokens, CAKE, bscTestnetTokens } from '@pancakeswap/tokens'
import { ChainId } from '@pancakeswap/chains'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import { TokenImage } from 'components/TokenImage'
import { CurrencyLogo } from 'components/Logo'
import { getRefAddress } from 'utils/getQueryString'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { useGetNftId, getFTPWhBhContract, useGetIsShareholder } from '../hooks/useGetIncome'
import StakeInput from './stakeInput'

const tokenInfo = {
  56: {
    address: bscTokens.cake.address,
    token: ChainId.BSC,
  },
  97: {
    address: bscTestnetTokens.cake.address,
    token: ChainId.BSC_TESTNET,
  },
}
export default function ModelTab() {
  const { address: account } = useAccount()
  const { toastSuccess } = useToast()
  const { t } = useTranslation()
  const { chainId } = useActiveChainId()
  const { callWithGasPrice } = useCallWithGasPrice()
  const FTPWhBhContract = getFTPWhBhContract()
  const [userNotEnoughCake, setUserNotEnoughCake] = useState(false)
  const { balance: userCake, fetchStatus } = useTokenBalance(tokenInfo[chainId || 56].address)
  const userCakeBalance = getBalanceAmount(userCake)
  const [bid, setBid] = useState('')
  let minAmount = 0n
  try {
    minAmount = BigInt(new BigNumber(bid).times(DEFAULT_TOKEN_DECIMAL).toString())
  } catch {
    //
  }
  const { nftId, teamId } = useGetNftId()
  const { isShareholder } = useGetIsShareholder()
  const handleInputChange = (input: string) => {
    setBid(input)
  }
  const setPercentageValue = () => {
    setBid(userCakeBalance.toString())
  }
  const appendComponent = (
    <Flex alignSelf="center" alignItems="center" width={40} mr={12}>
      <CurrencyLogo currency={CAKE[ChainId.BSC]} size="40px" />
      <Text marginLeft="10px">{CAKE[ChainId.BSC].symbol}</Text>
    </Flex>
  )
  useEffect(() => {
    if (fetchStatus === FetchStatus.Fetched && userCakeBalance.lt(bid)) {
      setUserNotEnoughCake(true)
    } else {
      setUserNotEnoughCake(false)
    }
  }, [bid, fetchStatus, userCakeBalance])
  const { isApproving, isApproved, isConfirming, handleApprove, handleConfirm } = useApproveConfirmTransaction({
    minAmount,
    spender: FTPWhBhContract?.address,
    token: CAKE[tokenInfo[chainId || 56].token],
    onApproveSuccess: async ({ receipt }) => {
      toastSuccess(
        t('Contract approved - you can now place your bid!'),
        <ToastDescriptionWithTx txHash={receipt.transactionHash} />,
      )
    },
    onConfirm: () => {
      const ref = getRefAddress()

      if (!isShareholder) {
        if (!ref && Number(nftId) === 0) {
          throw new Error(t('No inviter'))
        }
        if (ref && Number(nftId) === 0 && Number(teamId) === 0) {
          throw new Error(t('The inviter is invalid'))
        }
      }

      const bidAmount = new BigNumber(bid).times(DEFAULT_TOKEN_DECIMAL).toString()
      const add = !(Number(nftId) > 0 || isShareholder) ? ref : '0x0000000000000000000000000000000000000000'
      const id = nftId || teamId
      console.log(bidAmount, add)
      return callWithGasPrice(FTPWhBhContract, 'deposit', [bidAmount, add])
    },
    onSuccess: async ({ receipt }) => {
      toastSuccess(t('Bid placed!'), <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
    },
  })
  return (
    <>
      <Heading scale="xl" color="secondary" mt={['0px', '0px', '0px']} mb={['24px', '24px', '24px']}>
        {t('Teams')}ID: # {Number(nftId) === 0 ? (Number(teamId) === 0 ? '' : Number(teamId)) : Number(nftId)}
      </Heading>
      <StakeInput
        isWarning={false}
        placeholder="0"
        balance={userCakeBalance.toString()}
        value={bid}
        onUserInput={handleInputChange}
        appendComponent={appendComponent}
        setMax={setPercentageValue}
      />
      <Flex flexDirection="column" marginTop="20px">
        {account ? (
          <ApproveConfirmButtons
            isApproveDisabled={isApproved || !Number(bid)}
            isApproving={isApproving}
            isConfirmDisabled={getBalanceAmount(userCake).lt(bid) || userNotEnoughCake || !Number(bid)}
            isConfirming={isConfirming}
            onApprove={handleApprove}
            onConfirm={handleConfirm}
            buttonArrangement={ButtonArrangement.SEQUENTIAL}
          />
        ) : (
          <ConnectWalletButton />
        )}
      </Flex>
    </>
  )
}
