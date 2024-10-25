import { Flex, ButtonMenu, ButtonMenuItem, Box } from '@pancakeswap/uikit'
import { useState } from 'react';
import Page from '../Page'
import { AppBody } from 'components/App'
import IncomeTab from './components/IncomeTab';
import ModelTab from './components/ModelTab';
export default function White() {
    enum TEAMDIV {
        TEAM = 0,
        DIV = 1,
    }
    const [selectedTypeIndex, setSelectedTypeIndex] = useState(TEAMDIV.TEAM)
    return (
        <Page hideFooterOnDesktop={true}>
            <AppBody
                background='transparent'
                style={{
                    maxWidth: '854px',
                    background: 'transparent'
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
                            <ButtonMenuItem>对抗模型</ButtonMenuItem>
                            <ButtonMenuItem>收益</ButtonMenuItem>
                        </ButtonMenu>
                    </Flex>
                </Box>

                <Box paddingY="20px">
                    {selectedTypeIndex === TEAMDIV.TEAM ? <ModelTab /> : <IncomeTab />}
                </Box>
            </AppBody>
        </Page>
    )
}
