
import { Trans, useTranslation } from '@pancakeswap/localization'
import { Button, Card, Flex, FlexGap, Heading, Box, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
type BenefitCardType = 'Shareholders' | 'TeamLeader' | 'Team' | 'Trade'
const StyledCard = styled(Card)`
  height: 100%;
`

const StyleUl = styled.ul`
  list-style-type: '\u2022';
  list-style-position: outside;
  margin-left: 16px;

  li {
    padding-left: 10px;
  }
`
const HeadImage = styled.div`
  width: 68px;
  height: 68px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 72px;
    height: 72px;
  }

  img {
    height: 100%;
  }
`
const IncomeCard: React.FC<{
    type: BenefitCardType
    dataText?: string
    value1?:string|number
    value2?:string|number
    onClick?: () => void
}> = ({ type, dataText, onClick,value1=0,value2=0, }) => {
    return (
        <Box width='100%'>
            <StyledCard innerCardProps={{ p: ['16px', '16px', '24px'] }}>
                <FlexGap flexDirection="column" gap="16px" height="100%" justifyContent="space-between">
                    <FlexGap gap="16px" alignItems="center">
                        <HeadImage>
                            <img srcSet={`/images/cake-staking/benefit-earn-cake.png 2x`} alt="earn-cake" />
                        </HeadImage>
                        <FlexGap flexDirection="column" gap="8px">
                            <Flex>
                                <Heading as="h3" scale="lg" color="secondary">
                                    {dataText}
                                </Heading>
                            </Flex>
                            <Flex flexDirection="column">
                                <Text fontSize="12px" color="textSubtle" lineHeight="120%">
                                {type=='Trade'?'已分紅':'已領取'}      
                                </Text>
                                <Text fontSize="16px" bold lineHeight="120%">
                                    {value1||0}
                                </Text>
                            </Flex>
                            <Flex flexDirection="column">
                                <Text fontSize="12px" color="textSubtle" lineHeight="120%">
                                    {type=='Trade'?'剩餘分紅':'待領取'}  
                                </Text>
                                <Text fontSize="16px" bold lineHeight="120%">
                                    {value2||0}
                                </Text>
                            </Flex>
                        </FlexGap>
                    </FlexGap>
                {type=='Trade'?null:<Button width="100%" mt="auto" disabled={!Number(value2)} onClick={() => { }}>
                        领取
                    </Button>}    
                </FlexGap>
            </StyledCard>
        </Box>

    );
}
export default IncomeCard;