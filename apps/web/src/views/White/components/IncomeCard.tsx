import { useState } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import { Button, Card, Flex, FlexGap, Heading, Box, Text, useToast, AutoRenewIcon } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useCatchTxError from 'hooks/useCatchTxError'
import { ToastDescriptionWithTx } from 'components/Toast'
import dayjs from 'dayjs'
import { getFTPWhBhContract, formatNumber } from '../hooks/useGetIncome'

type BenefitCardType = 'Shareholders' | 'TeamLeader' | 'Team' | 'Trade'
const StyledCard = styled(Card)`
  height: 100%;
`

// const StyleUl = styled.ul`
//   list-style-type: '\u2022';
//   list-style-position: outside;
//   margin-left: 16px;

//   li {
//     padding-left: 10px;
//   }
// `
// const HeadImage = styled.div`
//   width: 68px;
//   height: 68px;
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;

//   ${({ theme }) => theme.mediaQueries.lg} {
//     width: 72px;
//     height: 72px;
//   }

//   img {
//     height: 100%;
//   }
// `
const formatTime = (data: number) => {
  return dayjs(dayjs.unix(data).toDate()).format('YYYY-MM-DD HH:mm:ss')
}
const spinnerIcon = <AutoRenewIcon spin color="currentColor" />
const IncomeCard: React.FC<{
  type: BenefitCardType
  dataText?: string
  value1?: string | number
  value2?: string | number
  value3?: string | number
  functionName?: string
  nextTime?: string | number
}> = ({ type, dataText, value1 = 0, value2 = 0, value3 = 0, functionName = '', nextTime }) => {
  const { callWithGasPrice } = useCallWithGasPrice()

  const { fetchWithCatchTxError } = useCatchTxError()
  const { toastSuccess } = useToast()
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const FTPWhBhContract = getFTPWhBhContract()
  const receive = async () => {
    setIsLoading(true)
    const receipt = await fetchWithCatchTxError(() => {
      return callWithGasPrice(FTPWhBhContract, functionName, [])
    })
    if (receipt?.status) {
      toastSuccess(t('Bid placed!'), <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
    }
    setIsLoading(false)
  }
  return (
    <Box width="100%">
      <StyledCard innerCardProps={{ p: ['16px', '16px', '24px'] }}>
        <FlexGap flexDirection="column" gap="16px" height="100%" justifyContent="space-between">
          <FlexGap gap="16px" alignItems="center">
            {/* <HeadImage>
                            <img srcSet={`/images/cake-staking/benefit-earn-cake.png 2x`} alt="earn-cake" />
                        </HeadImage> */}
            <FlexGap flexDirection="column" gap="8px">
              <Flex>
                <Heading as="h3" scale="lg" color="secondary">
                  {dataText}
                </Heading>
              </Flex>
              <Flex flexDirection="column">
                <Text fontSize="12px" color="textSubtle" lineHeight="120%">
                  {type === 'Trade' ? t('Dividend has been distributed') : t('Claimed')}
                </Text>
                <Text fontSize="16px" bold lineHeight="120%">
                  {formatNumber(value1) || 0}
                </Text>
              </Flex>
              <Flex flexDirection="column">
                <Text fontSize="12px" color="textSubtle" lineHeight="120%">
                  {type === 'Trade' ? t('Remaining dividends') : t('to be claimed')}
                </Text>
                <Text fontSize="16px" bold lineHeight="120%">
                  {formatNumber(value2) || 0}
                </Text>
              </Flex>
              {type === 'Team' ? (
                <Flex flexDirection="column">
                  <Text fontSize="12px" color="textSubtle" lineHeight="120%">
                    {t('Dividend ratio')}
                  </Text>
                  <Text fontSize="16px" bold lineHeight="120%">
                    {formatNumber(value3) || 0}%
                  </Text>
                </Flex>
              ) : null}
            </FlexGap>
          </FlexGap>
          {!!nextTime && !!nextTime && Number(nextTime) * 1000 > new Date().getTime() && (
            <Text fontSize="12px" color="textSubtle" lineHeight="120%">
              {t('Next collection time')}:{formatTime(Number(nextTime.toString()))}
            </Text>
          )}
          {type === 'Trade' ? null : (
            <Button
              width="100%"
              mt="auto"
              disabled={isLoading || !Number(value2) || (!!nextTime && Number(nextTime) * 1000 > new Date().getTime())}
              onClick={receive}
              endIcon={isLoading ? spinnerIcon : undefined}
            >
              {isLoading ? t('Receiving') : t('Claim')}
            </Button>
          )}
        </FlexGap>
      </StyledCard>
    </Box>
  )
}
export default IncomeCard
