import { ChainId } from '@pancakeswap/chains'
import { useTranslation } from '@pancakeswap/localization'
import { CAKE } from '@pancakeswap/tokens'
import { ArrowDownIcon, Box, Button, CopyButton, Flex, Heading, Text, useToast } from '@pancakeswap/uikit'
import { getBalanceAmount } from '@pancakeswap/utils/formatBalance'
import { formatAmount } from '@pancakeswap/utils/formatFractions'
import BigNumber from 'bignumber.js'
import { AppBody } from 'components/App'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { ToastDescriptionWithTx } from 'components/Toast'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import { useActiveChainId } from 'hooks/useActiveChainId'
import useNativeCurrency from 'hooks/useNativeCurrency'
import { usePublicNodeWaitForTransaction } from 'hooks/usePublicNodeWaitForTransaction'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { getRefAddress } from 'utils/getQueryString'
import { useAccount, useWalletClient } from 'wagmi'
import smgz from '../../../public/images/smgz.png'
import Page from '../Page'
import FromInput from './components/fromInput'
import ToInput from './components/toInput'
import { getPreSaleTokenContract, useGetIncome } from './hooks/useGetIncome'

export default function Launchpad() {
  const { t } = useTranslation()
  const { address: account } = useAccount()
  const { chainId } = useActiveChainId()
  const [fromval, setFromval] = useState('')
  const native = useNativeCurrency()
  const { data: walletClient } = useWalletClient()
  const PreSaleTokenContract = getPreSaleTokenContract()
  const [isLoading, setIsLoading] = useState(false)
  const { waitForTransaction } = usePublicNodeWaitForTransaction()
  const { toastError, toastSuccess } = useToast()

  const fomCurrencyBalance = useCurrencyBalance(account ?? undefined, native ?? undefined)
  const fomBalance = formatAmount(fomCurrencyBalance, 6)

  // const toCurrencyBalance = useCurrencyBalance(account ?? undefined, CAKE[ChainId.BSC] ?? undefined)
  // const toBalance = formatAmount(toCurrencyBalance, 6)

  const { price, minBNB, maxBNB, people, amount, balance } = useGetIncome()

  const priceStr = getBalanceAmount(new BigNumber(price?.toString() || 0)).toString()
  const minBNBStr = getBalanceAmount(new BigNumber(minBNB?.toString() || 0)).toString()
  const maxBNBStr = getBalanceAmount(new BigNumber(maxBNB?.toString() || 0)).toString()
  const amountStr = getBalanceAmount(new BigNumber(amount?.toString() || 0)).toString()
  const balanceStr = getBalanceAmount(new BigNumber(balance?.toString() || 0)).toString()

  const reLink = useMemo(() => {
    return `${window.location.protocol}//${window.location.host}/launchpad?ref=${account ?? ''}`
  }, [account])

  const getVal = useMemo(() => {
    return (Number(fromval) * Number(priceStr)).toString()
  }, [fromval, account, priceStr])

  const isDisabled = useMemo(() => {
    return (
      !Number(fromval) ||
      isLoading ||
      Number(fromval) < Number(minBNBStr) ||
      Number(fromval) > Number(maxBNBStr) ||
      Number(fromval) > Number(fomBalance)
    )
  }, [isLoading, fromval, minBNBStr, maxBNBStr, fomBalance])

  const handleConfirm = () => {
    const ref = getRefAddress()
    const add = ref || '0x0000000000000000000000000000000000000000'
    const bidAmount = new BigNumber(fromval).times(DEFAULT_TOKEN_DECIMAL).toString()
    setIsLoading(true)
    walletClient
      ?.writeContract({
        ...PreSaleTokenContract,
        account: walletClient.account,
        functionName: 'contribute',
        args: [add],
        value: BigInt(bidAmount),
      })
      .then((hash) => {
        waitForTransaction({
          hash,
          chainId,
        }).then((receipt) => {
          setIsLoading(false)
          if (receipt?.status) {
            toastSuccess(t('Bid placed!'), <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
          }
        })
      })
      .catch((err) => {
        setIsLoading(false)
        toastError(
          t('Error'),
          t('Transaction failed with error: %reason%', {
            reason: err.shortMessage || err.message,
          }),
        )
      })
  }

  return (
    <Page>
      <AppBody
        background="transparent"
        style={{
          maxWidth: '854px',
          background: 'transparent',
        }}
      >
        <Heading scale="xl" color="#FDD436" mt={['24px']} mb={['24px', '24px', '24px']}>
          {t('Launchpad')}
        </Heading>
        <Flex
          flexDirection="column"
          alignItems="center"
          marginY="20px"
          border="1px solid #EFB90B"
          p="16px"
          borderRadius="24px"
          background="#232321"
        >
          <FromInput
            isWarning={false}
            placeholder="0"
            value={fromval}
            balance={fomBalance}
            onUserInput={(input: string) => {
              setFromval(input)
              // setToval((input*priceStr).toString())
            }}
            currency={native}
            setMax={() => {
              if (fomBalance) {
                setFromval(fomBalance)
              }
            }}
          />
          <Box width="56px" height="56px" borderRadius="50%" background="#5D532B" my="10px" p="10px">
            <ArrowDownIcon width="36px" color="#FDD436" />
          </Box>
          <ToInput isWarning={false} placeholder="0" value={getVal} balance={balanceStr} currency={CAKE[ChainId.BSC]} />
          <Flex flexDirection="column" marginTop="20px" width="100%">
            {account ? (
              <Button
                width="100%"
                style={{ background: isDisabled ? '' : '#FDD436', color: isDisabled ? '' : '#171A1F' }}
                disabled={isDisabled}
                onClick={handleConfirm}
              >
                {isLoading ? t('Confirming') : t('qd')}
              </Button>
            ) : (
              <ConnectWalletButton />
            )}
          </Flex>
        </Flex>

        <Box p="16px" background="#262C33" borderRadius="12px" mb="24px">
          <Flex mb="14px" alignItems="center">
            <Image src={smgz} alt="" height={20} width={20} unoptimized />
            <Text fontSize={14} color="#5D6673" lineHeight="24px" fontWeight="600" ml="4px">
              {t('smgz')}
            </Text>
          </Flex>
          <Text fontSize={14} color="#5D6673" lineHeight="24px" fontWeight="600">
            {t('1. Get %b% for every %a%', {
              a: '1BNB',
              b: `${priceStr || 0} Simb`,
            })}
          </Text>
          <Text fontSize={14} color="#5D6673" lineHeight="24px" fontWeight="600">
            {t('2. Minimum %a%, maximum %b% and an integer multiple of %a%', {
              a: `${minBNBStr} BNB`,
              b: `${maxBNBStr} BNB`,
            })}
          </Text>
        </Box>
        <Box background="#423A18" borderRadius="12px" p="16px" mb="12px" pr={0}>
          <Flex width="100%" height="100%" justifyContent="space-between" alignItems="center">
            <Text fontSize={16} color="#EFB90B" style={{ flexShrink: 0 }} mr="10px">
              {t('Invitation link')}
            </Text>
            <Flex alignItems="center" flex={1} width="100%" justifyContent="flex-end">
              <Text fontSize={14} color="#B6C0CC" style={{ wordBreak: 'break-all' }}>
                {reLink}
              </Text>
              <CopyButton
                style={{ flexShrink: 0 }}
                color="#FDD436"
                width="20px"
                text={reLink}
                tooltipMessage={t('Copied')}
                p={0}
              />
            </Flex>
          </Flex>
        </Box>
        <Box background="#423A18" borderRadius="12px" height="64px" px="16px" mb="12px">
          <Flex width="100%" height="100%" justifyContent="space-between" alignItems="center">
            <Text fontSize={16} color="#EFB90B">
              {t('Launchpad-3')}
            </Text>
            <Text fontSize={14} color="#B6C0CC">
              {people.toString() || 0}
            </Text>
          </Flex>
        </Box>
        <Box background="#423A18" borderRadius="12px" height="64px" px="16px" mb="12px">
          <Flex width="100%" height="100%" justifyContent="space-between" alignItems="center">
            <Text fontSize={16} color="#EFB90B">
              {t('Launchpad-4')}
            </Text>
            <Text fontSize={14} color="#B6C0CC">
              {amountStr}BNB
            </Text>
          </Flex>
        </Box>
      </AppBody>
    </Page>
  )
}
