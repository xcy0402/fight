import { useState, useEffect } from 'react'
import { styled } from 'styled-components'
import BigNumber from 'bignumber.js'
import { Modal, Text, Flex, BalanceInput,CopyAddress, Box,FlexGap, Button, LogoRoundIcon, useToast, Heading } from '@pancakeswap/uikit'
import { useAccount } from 'wagmi'
import { useTranslation } from '@pancakeswap/localization'
import { formatNumber, getBalanceAmount, getBalanceNumber } from '@pancakeswap/utils/formatBalance'
import useTheme from 'hooks/useTheme'
import useTokenBalance from 'hooks/useTokenBalance'
import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransaction'
import { useNftDepContract } from 'hooks/useContract'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import ConnectWalletButton from 'components/ConnectWalletButton'
import ApproveConfirmButtons, { ButtonArrangement } from 'components/ApproveConfirmButtons'
import { ConnectedBidder, FetchStatus } from 'config/constants/types'
import { useCakePrice } from 'hooks/useCakePrice'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import { bscTokens, CAKE,bscTestnetTokens } from '@pancakeswap/tokens'
import { ChainId } from '@pancakeswap/chains'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import StakeInput from './stakeInput';
import { TokenImage } from 'components/TokenImage'
import { CurrencyLogo } from 'components/Logo'
import { erc20ABI, usePublicClient, useWalletClient,useWaitForTransaction } from 'wagmi'
import { useTokenContract } from 'hooks/useContract'
import { MaxUint256 } from '@pancakeswap/swap-sdk-core'
export default function ModelTab() {
  const { address: account } = useAccount()
  const { toastSuccess } = useToast()
  const { t } = useTranslation()
  const { callWithGasPrice } = useCallWithGasPrice()
  const farmAuctionContract = useNftDepContract()
  const [userNotEnoughCake, setUserNotEnoughCake] = useState(false)
  const { balance: userCake, fetchStatus } = useTokenBalance(bscTokens.cake.address)
  // const { balance: userCake, fetchStatus } = useTokenBalance(bscTestnetTokens.cake.address)
  const userCakeBalance = getBalanceAmount(userCake)
  const cakePriceBusd = useCakePrice()
  const [bid, setBid] = useState('')
  let minAmount = 0n
  try {
    minAmount = BigInt(new BigNumber(bid).times(DEFAULT_TOKEN_DECIMAL).toString())
  } catch {
    //
  }
  
  const handleInputChange = (input: string) => {
    setBid(input)
  }
  const setPercentageValue = () => {
    setBid(userCakeBalance.toString())
  }
  const appendComponent = (
    <Flex alignSelf="center" alignItems='center' width={40} mr={12}>
      <CurrencyLogo currency={CAKE[ChainId.BSC]} size="40px" />
      <Text marginLeft='10px'>{CAKE[ChainId.BSC].symbol}</Text>
    </Flex>
  )
  const getQueryString=(name)=> {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] == name) { return pair[1]; }
    }
    return ('');
}
const [revAdd,setRevAdd]=useState('')
  useEffect(()=>{
    const referrerAddress = getQueryString('ref') || '';
    setRevAdd(referrerAddress)
  },[])
  useEffect(() => {
    if (fetchStatus === FetchStatus.Fetched && userCakeBalance.lt(bid)) {
      setUserNotEnoughCake(true)
    } else {
      setUserNotEnoughCake(false)
    }
  }, [bid, fetchStatus, userCakeBalance])
  const { isApproving, isApproved, isConfirmed, isConfirming, handleApprove, handleConfirm } =
    useApproveConfirmTransaction({
      minAmount,
      spender: farmAuctionContract?.address,
      token: CAKE[ChainId.BSC],
      onApproveSuccess: async ({ receipt }) => {
        toastSuccess(
          t('Contract approved - you can now place your bid!'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash} />,
        )
      },
      onConfirm: () => {
        const bidAmount = new BigNumber(bid).times(DEFAULT_TOKEN_DECIMAL).toString()
        return callWithGasPrice(farmAuctionContract, 'deposit', [bidAmount,'1',revAdd])
      },
      onSuccess: async ({ receipt }) => {
        toastSuccess(t('Bid placed!'), <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
      },
    })
  return (
    <> 
      <Heading scale="xl" color="secondary" mt={['0px', '0px', '0px']} mb={['24px', '24px', '24px']}>
        团队名称
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
      <Flex flexDirection="column" marginTop='20px'>
        {account ? (
          <ApproveConfirmButtons
            isApproveDisabled={isApproved||!Number(bid)}
            isApproving={isApproving}
            isConfirmDisabled={
              getBalanceAmount(userCake).lt(bid) ||
              isConfirmed ||
              userNotEnoughCake ||
              !Number(bid)
            }
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