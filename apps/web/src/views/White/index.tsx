import {
    BottomDrawer, Flex, Modal, ModalV2, ButtonMenu,
    ButtonMenuItem, useMatchBreakpoints, Box, CardBody, Button, Text
} from '@pancakeswap/uikit'
import { useState } from 'react';
import Page from '../Page'
import { AppBody } from 'components/App'
import { styled } from 'styled-components'
import IncomeTab from './components/IncomeTab';
import ModelTab from './components/ModelTab';
export default function White() {
    enum TEAMDIV {
        TEAM = 0,
        DIV = 1,
    }
    const [selectedTypeIndex, setSelectedTypeIndex] = useState(TEAMDIV.TEAM)
    const receive=()=>{

    }
    return (
        <Page hideFooterOnDesktop={true}>
            <AppBody
            background='transparent'
                style={{
                    maxWidth: '854px',
                    background:'transparent'
                }}
            >
                <Box marginY='20px' >
                    <Flex as="label" htmlFor="hide-close-positions" alignItems="center">
                        <ButtonMenu
                            scale="sm"
                            activeIndex={selectedTypeIndex}
                            onItemClick={(index) => setSelectedTypeIndex(index)}
                            variant="subtle"
                        >
                            <ButtonMenuItem>團隊分紅</ButtonMenuItem>
                            <ButtonMenuItem>交易分紅</ButtonMenuItem>
                        </ButtonMenu>
                    </Flex>
                </Box>

                <Box paddingY="20px">
                    {
                        selectedTypeIndex === TEAMDIV.TEAM ?<ModelTab/>:<IncomeTab/>
                            // <Box width='100%'>
                            //     <Flex justifyContent='space-between' alignItems='center'>
                            //         <Text>股东奖励：1000</Text>
                            //         <Button isLoading={true} onClick={receive}>领取</Button>
                            //     </Flex>
                            //     <Flex justifyContent='space-between' alignItems='center' paddingY='10px'>
                            //         <Text>团队长奖励：1000</Text>
                            //         <Button>领取</Button>
                            //     </Flex>
                            //     <Flex justifyContent='space-between' alignItems='center' paddingY='10px'>
                            //         <Text>团队分红：1000</Text>
                            //         <Button>领取</Button>
                            //     </Flex>
                            //     <Box marginTop='20px' >
                            //         <Text>团队名单</Text>
                            //     </Box>
                            // </Box> :
                            // <Box>
                            //     <Box marginBottom='20px'>
                            //         <Text>投入金额:100$</Text>
                            //     </Box>
                            //     <Box marginBottom='20px' >
                            //         <Text>已分红:100$</Text>
                            //     </Box>
                            //     <Box marginBottom='20px' >
                            //         <Text>剩余分红:100$</Text>
                            //     </Box>
                            // </Box>
                    }
                </Box>
            </AppBody>
        </Page>
    )
}
