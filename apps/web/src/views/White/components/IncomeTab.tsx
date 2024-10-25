import { Trans, useTranslation } from '@pancakeswap/localization'
import { Button, CopyAddress, Flex, FlexGap, Heading, Link, Text, Box, Grid, useMatchBreakpoints, useToast } from '@pancakeswap/uikit'
import styled from 'styled-components'
import IncomeCard from './IncomeCard';
import { useAccount } from 'wagmi'
import { useState, useEffect, useMemo } from 'react';
import { Address, useContractReads } from 'wagmi'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { useGetNftId, getFTPWhBhContract, useGetIncome } from '../hooks/useGetIncome';
import { getBalanceAmount, getBalanceNumber } from '@pancakeswap/utils/formatBalance'
import BigNumber from 'bignumber.js'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useCatchTxError from 'hooks/useCatchTxError';
import { ToastDescriptionWithTx } from 'components/Toast'
const SumBox = styled(Box)`
  width: 100%;
  border-radius:12px;
  background:#FFF;
  padding:20px;
  margin-bottom:40px;
`
const ValueText = styled(Text)`
  font-size: 16px;
  font-weight: 400;
`
export function formatNumber(number, decimalPlaces = 6) {
    if (!number || isNaN(number)) return 0;
    if (Number.isInteger(Number(number))) {
        // 如果是整数，返回整数部分
        return number.toString();
    } else {
        // 如果是小数，保留指定位数的小数但不做四舍五入
        let str = number.toString();
        let decimalIndex = str.indexOf('.');
        if (decimalIndex !== -1) {
            return parseFloat(str.slice(0, decimalIndex + decimalPlaces + 1));
        } else {
            return number;
        }
    }
}
export default function IncomeTab() {
    const { isDesktop, isMobile } = useMatchBreakpoints()
    const { t } = useTranslation()
    const { address: account } = useAccount()
    const { chainId } = useActiveChainId()
    const { nftId } = useGetNftId();
    const { callWithGasPrice } = useCallWithGasPrice()
    const FTPWhBhContract = getFTPWhBhContract()
    const { fetchWithCatchTxError } = useCatchTxError()
    const { toastSuccess } = useToast()
    const { investmentAmount, performanceAmount, shareholdersReceived, shareholdersReceive, teamReceived, teamReceive, dividendsReceived, dividendsReceive, dividendsTime, tradeReceived, tradeReceive } = useGetIncome()
    const investmentAmountStr = getBalanceAmount(new BigNumber(investmentAmount?.toString() || 0)).toString()
    const performanceAmountStr = getBalanceAmount(new BigNumber(performanceAmount?.toString() || 0)).toString()
    const shareholdersReceivedStr = getBalanceAmount(new BigNumber(shareholdersReceived?.toString() || 0)).toString()
    const shareholdersReceiveStr = getBalanceAmount(new BigNumber(shareholdersReceive?.toString() || 0)).toString()
    const teamReceivedStr = getBalanceAmount(new BigNumber(teamReceived?.toString() || 0)).toString()
    const teamReceiveStr = getBalanceAmount(new BigNumber(teamReceive?.toString() || 0)).toString()
    const dividendsReceivedStr = getBalanceAmount(new BigNumber(dividendsReceived?.toString() || 0)).toString()
    const dividendsReceiveStr = getBalanceAmount(new BigNumber(dividendsReceive?.toString() || 0)).toString()
    const tradeReceivedStr = getBalanceAmount(new BigNumber(tradeReceived?.toString() || 0)).toString()
    const tradeReceiveStr = getBalanceAmount(new BigNumber(tradeReceive?.toString() || 0)).toString()
    const receive = async (functionName: string) => {
        const receipt = await fetchWithCatchTxError(() => {
            return callWithGasPrice(FTPWhBhContract, functionName, [])
        })
        if (receipt?.status) {
            toastSuccess(t('Bid placed!'), <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
        }
    }
    return (
        <>
            {/* <Box marginBottom='20px'>
                <Text color='#7645d9' fontSize='16px' fontWeight='bold'>邀请链接</Text>
            </Box> */}

            {
                (nftId == 0) ? null :
                    <>
                        <Heading scale="xl" color="secondary" mt={['0px', '0px', '0px']} mb={['24px', '24px', '24px']}>
                            {t('Invitation link')}
                        </Heading>
                        <FlexGap flexDirection="column" mb="24px" gap="8px">
                            <CopyAddress tooltipMessage={t('Copied')} account={`${window.location.protocol}//${window.location.host}/white-hole?ref=${account ?? ''}`} />
                        </FlexGap>
                    </>
            }
            <Heading scale="xl" color="secondary" mt={['0px', '0px', '0px']} mb={['24px', '24px', '24px']}>
                {t('Summary')}
            </Heading>
            <SumBox >
                <Flex marginBottom='20px' width='100%' alignItems='center' justifyContent='space-between'>
                    <Text fontSize={14} color="textSubtle" textTransform="uppercase">
                        {t('Investment amount')}
                    </Text>
                    <ValueText>{formatNumber(investmentAmountStr) }$</ValueText>
                </Flex>
                <Flex width='100%' alignItems='center' justifyContent='space-between'>
                    <Text fontSize={14} color="textSubtle" textTransform="uppercase">
                        {t('Team Performance')}
                    </Text>
                    <ValueText>{formatNumber(performanceAmountStr) }$</ValueText>
                </Flex>
                <Flex></Flex>
            </SumBox>
            <Heading scale="xl" color="secondary" mt={['0px', '0px', '0px']} mb={['24px', '24px', '24px']}>
                {t('Dividend')}
            </Heading>
            <Box marginBottom='24px'>
                <IncomeCard type="Trade" dataText={t('Trading dividend')} value1={tradeReceivedStr} value2={tradeReceiveStr} />
            </Box>
            <Grid
                width='100%'
                maxWidth="820px"
                gridGap="24px"
                gridTemplateColumns={isDesktop ? 'repeat(2, 1fr)' : '1fr'}
                alignItems="center"
                mx="auto"
            >
                <IncomeCard type="Shareholders" functionName='claimCeoReward' dataText={t('Shareholder Rewards')} value1={shareholdersReceivedStr} value2={shareholdersReceiveStr} />
                <IncomeCard type="TeamLeader" functionName='claimLeaderReward' dataText={t('Team leader reward')} value1={teamReceivedStr} value2={teamReceiveStr} />
                <IncomeCard type="Team" functionName='claim' dataText={t('Team bonus')} nextTime={dividendsTime} value1={dividendsReceivedStr} value2={dividendsReceiveStr} />

            </Grid>

        </>
    )
}