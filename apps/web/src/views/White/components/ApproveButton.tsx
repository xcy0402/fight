import { Modal, Text, Flex, BalanceInput,AutoRenewIcon, Box,FlexGap, Button, LogoRoundIcon, useToast, Heading } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import {useState,useEffect} from 'react';
import { useAccount } from 'wagmi'
import useTokenAllowance from 'hooks/useTokenAllowance'
import { bscTokens, CAKE,bscTestnetTokens } from '@pancakeswap/tokens'
import { ChainId } from '@pancakeswap/chains'
interface approveProps{
    isApproveDisabled:boolean,
    isConfirmDisabled:boolean,
    isConfirming:boolean,
    isApproving:boolean,
}
const spinnerIcon = <AutoRenewIcon spin color="currentColor" />
const ApproveButton:React.FC<approveProps>=({
    isApproveDisabled,
    isConfirming,
    isApproving,
    isConfirmDisabled
})=>{
    const { address: account } = useAccount()
    const { t } = useTranslation()
    const [allowance,setAllowance]=useState('0')
   const getAllowance=()=>{
    const value= useTokenAllowance(bscTestnetTokens[ChainId.BSC], account, '0xd0AB4143a233EB46c7A13eceb7dC1F996cD004Cc')
    setAllowance(value.toString())
   }
   const approve=async ()=>{
    const tokenContract = useTokenContract(bscTestnetTokens.cake.address)
    if(!tokenContract) return;
    const estimatedGas = await tokenContract.estimateGas
        .approve(
          ['0xd0AB4143a233EB46c7A13eceb7dC1F996cD004Cc', MaxUint256], // TODO: Fix viem
          // @ts-ignore
          {
            account: tokenContract.account,
          },
        )
        .catch(() => {
          return tokenContract.estimateGas
            .approve(
              ['0xd0AB4143a233EB46c7A13eceb7dC1F996cD004Cc', MaxUint256],
              // @ts-ignore
              {
                account: tokenContract.account,
              },
            )
            .catch((e) => {
              console.error('estimate gas failure', e)
              return null
            })
        })
  }
  const send=()=>{

  }
    useEffect(()=>{
        if(account) {
            getAllowance()
        }
    },[account])
    return (
        <>
        {isApproveDisabled ? (
          <Box>
            <Button
              onClick={send}
              disabled={isConfirmDisabled}
              isLoading={isConfirming}
              endIcon={isConfirming ? spinnerIcon : undefined}
            >
              {isConfirming ? t('Confirming') : t('Confirm')}
            </Button>
          </Box>
        ) : (
          <Box>
            <Button onClick={approve} endIcon={isApproving ? spinnerIcon : undefined} isLoading={isApproving}>
              {isApproving ? t('Enabling') : t('Enable')}
            </Button>
          </Box>
        )}
        </>
    )
}
export default ApproveButton;