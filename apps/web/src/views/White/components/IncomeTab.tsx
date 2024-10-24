import { Trans, useTranslation } from '@pancakeswap/localization'
import { Button, CopyAddress, Flex, FlexGap, Heading, Link, Text, Box, Grid, useMatchBreakpoints } from '@pancakeswap/uikit'
import styled from 'styled-components'
import IncomeCard from './IncomeCard';
import { useAccount } from 'wagmi'
import {useState,useEffect} from 'react';
import { Address, useContractReads } from 'wagmi'
import { useActiveChainId } from 'hooks/useActiveChainId'
import abi1 from '../abi/abi1.json';
import abi2 from '../abi/abi2.json';
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
export default function IncomeTab() {
    const { isDesktop, isMobile } = useMatchBreakpoints()
    const { t } = useTranslation()
    const { address: account } = useAccount()
    const { chainId } = useActiveChainId()
    const [value1,setValue1]=useState(0)
    const [value2,setValue2]=useState(0)
    const [value3,setValue3]=useState(0)
    const [value4,setValue4]=useState(0)
    const [value5,setValue5]=useState(0)
    const [value6,setValue6]=useState(0)
    const [value7,setValue7]=useState(0)
    const [value8,setValue8]=useState(0)
    useEffect(()=>{
        if(account){
            // const { data: results } = useContractReads({
            //     watch: true,
            //     enabled: true,
            //     contracts: [
            //       {
            //         chainId,
            //         abi: abi1,
            //         address: '0x85C9AcF3952B6F0940d1582f982d923Cc3824184',
            //         functionName: 'getUserPrincipal',
            //         args: [account],
            //       },
            //       {
            //         chainId,
            //         abi:abi2,
            //         address: '0x7a3D4dd93208B287b0cC9BfB461B2106E87D135e',
            //         functionName: 'accountOf',
            //         args: [account],
            //       },
            //       {
            //         chainId,
            //         abi: abi2,
            //         address: '0x7a3D4dd93208B287b0cC9BfB461B2106E87D135e',
            //         functionName: 'getAccount',
            //         args: [account],
            //       },
            //     ],
            //   })
            //   console.log(results);
        }
        
    },[account])
    return (
        <>
            {/* <Box marginBottom='20px'>
                <Text color='#7645d9' fontSize='16px' fontWeight='bold'>邀请链接</Text>
            </Box> */}
            <Heading scale="xl" color="secondary" mt={['0px', '0px', '0px']} mb={['24px', '24px', '24px']}>
                邀请链接
            </Heading>
            <FlexGap flexDirection="column" mb="24px" gap="8px">
                <CopyAddress tooltipMessage={t('Copied')} account={`${window.location.protocol}//${window.location.host}?ref=${account ?? ''}`} />
            </FlexGap>
            <Heading scale="xl" color="secondary" mt={['0px', '0px', '0px']} mb={['24px', '24px', '24px']}>
                匯總
            </Heading>
            <SumBox >
                <Flex marginBottom='20px' width='100%' alignItems='center' justifyContent='space-between'>
                    <Text fontSize={14} color="textSubtle" textTransform="uppercase">
                        投入金額
                    </Text>
                    <ValueText>100$</ValueText>
                </Flex>
                <Flex width='100%' alignItems='center' justifyContent='space-between'>
                    <Text fontSize={14} color="textSubtle" textTransform="uppercase">
                        團隊業績
                    </Text>
                    <ValueText>100$</ValueText>
                </Flex>
                <Flex></Flex>
            </SumBox>
            <Heading scale="xl" color="secondary" mt={['0px', '0px', '0px']} mb={['24px', '24px', '24px']}>
                分紅
            </Heading>
            <Box marginBottom='24px' paddingX='24px'>
            <IncomeCard type="Trade" dataText="交易分紅" value1={value7} value2={value8} />
            </Box>
            <Grid
                width='100%'
                maxWidth="820px"
                gridGap="24px"
                gridTemplateColumns={isDesktop ? 'repeat(2, 1fr)' : '1fr'}
                alignItems="center"
                mx="auto"
            >
                <IncomeCard type="Shareholders" dataText="股東獎勵" value1={value1} value2={value2} />
                <IncomeCard type="TeamLeader" dataText="團隊長獎勵" value1={value3} value2={value4} />
                <IncomeCard type="Team" dataText="團隊分紅" value1={value5} value2={value6} />
                
            </Grid>

        </>
    )
}