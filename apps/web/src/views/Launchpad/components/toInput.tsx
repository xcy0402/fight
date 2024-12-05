import { useTranslation } from '@pancakeswap/localization'
import React, { ReactNode, InputHTMLAttributes } from 'react'
import { styled } from 'styled-components'
import { Text, Flex, Input, Box, Button, BoxProps, InputProps } from '@pancakeswap/uikit'
import { CurrencyLogo } from 'components/Logo'
import { Currency } from '@pancakeswap/sdk'

export interface BalanceInputProps extends BoxProps {
  value: string | number
  onUserInput?: (input: string) => void
  inputAlign?: 'left' | 'right'
  innerRef?: React.RefObject<HTMLInputElement>
  currencyValue?: ReactNode
  placeholder?: string
  inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'placeholder' | 'onChange'> & InputProps
  isWarning?: boolean
  decimals?: number
  unit?: ReactNode
  appendComponent?: ReactNode
  switchEditingUnits?: () => void
  setMax?: () => void
  balance?: string | number
  currency: Currency | undefined
}
export const StyledBalanceInput = styled(Box)<{ isWarning: BalanceInputProps['isWarning'] }>`
  background-color: ${({ theme }) => theme.colors.input};
  border: 1px solid ${({ theme }) => theme.colors.inputSecondary};
  border-radius: 16px;
  box-shadow: ${({ theme, isWarning }) => theme.shadows[isWarning ? 'warning' : 'inset']};
  padding: 8px 16px;
`

export const StyledInput = styled(Input)<{ textAlign?: string }>`
  background: transparent;
  border-radius: 0;
  box-shadow: none;
  padding-left: 0;
  padding-right: 0;
  text-align: ${({ textAlign = 'right' }) => textAlign};
  border: none;

  ::placeholder {
    color: ${({ theme }) => theme.colors.textSubtle};
  }

  &:focus:not(:disabled) {
    box-shadow: none;
  }
`
export const UnitContainer = styled(Text)`
  margin-left: 4px;
  text-align: right;
  color: ${({ theme }) => theme.colors.textSubtle};
  white-space: nowrap;
`
const ToInput: React.FC<React.PropsWithChildren<BalanceInputProps>> = ({
  value,
  placeholder = '0.0',
  onUserInput,
  currencyValue,
  inputProps,
  innerRef,
  isWarning = false,
  decimals = 18,
  unit,
  appendComponent,
  switchEditingUnits,
  setMax,
  balance,
  currency,
  ...props
}) => {
  const { t } = useTranslation()
  // const { chainId } = useActiveChainId()

  return (
    <Box width="100%">
      <Flex justifyContent="space-between" alignItems="center" mb="4px">
        <Text color="#818B99" fontSize={14} lineHeight="24px">
          {t('get')}
        </Text>
        <Text fontSize={11} color="#818B99" lineHeight="24px">
          {t('Balance')}:{balance || 0}
        </Text>
      </Flex>
      <Flex alignItems="center" background="#0B0E12" borderRadius="16px" px="16px" height="78px">
        <Flex alignSelf="center" alignItems="center" mr={12}>
          <CurrencyLogo currency={currency} size="40px" />
          <Text marginLeft="10px">{currency?.symbol || ''}</Text>
        </Flex>
        <StyledInput
          readOnly
          style={{ flex: 1 }}
          pattern={`^[0-9]*[.,]?[0-9]{0,${decimals}}$`}
          inputMode="decimal"
          min="0"
          value={value}
          placeholder={placeholder}
          ref={innerRef}
          {...inputProps}
        />
      </Flex>
    </Box>
  )
}

export default ToInput
