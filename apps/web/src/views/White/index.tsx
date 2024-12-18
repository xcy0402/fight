import { Flex, ButtonMenu, ButtonMenuItem, Box } from '@pancakeswap/uikit'
import { useState } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import { AppBody } from 'components/App'
import IncomeTab from './components/IncomeTab'
import ModelTab from './components/ModelTab'
import Page from '../Page'

export default function White() {
  enum TEAMDIV {
    TEAM = 0,
    DIV = 1,
  }
  const { t } = useTranslation()
  const [selectedTypeIndex, setSelectedTypeIndex] = useState(TEAMDIV.TEAM)
  return (
    <Page>
      <AppBody
        background="transparent"
        style={{
          maxWidth: '854px',
          background: 'transparent',
        }}
      >
        <Box marginY="20px">
          <Flex as="label" htmlFor="hide-close-positions" alignItems="center">
            <ButtonMenu
              scale="sm"
              activeIndex={selectedTypeIndex}
              onItemClick={(index) => setSelectedTypeIndex(index)}
              variant="subtle"
            >
              <ButtonMenuItem>{t('Adversarial Model')}</ButtonMenuItem>
              <ButtonMenuItem>{t('income')}</ButtonMenuItem>
            </ButtonMenu>
          </Flex>
        </Box>

        <Box paddingY="20px">{selectedTypeIndex === TEAMDIV.TEAM ? <ModelTab /> : <IncomeTab />}</Box>
      </AppBody>
    </Page>
  )
}
