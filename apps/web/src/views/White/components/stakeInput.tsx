import { useTranslation } from '@pancakeswap/localization'
import React, { ReactNode, InputHTMLAttributes } from 'react'
import { styled } from 'styled-components'
import { Text, Flex, Input, Box, Button, BoxProps, InputProps } from '@pancakeswap/uikit'
import { formatNumber } from '../hooks/useGetIncome'

export interface BalanceInputProps extends BoxProps {
  value: string | number
  onUserInput: (input: string) => void
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
  setMax: () => void
  balance: string | number
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
const StakeInput: React.FC<React.PropsWithChildren<BalanceInputProps>> = ({
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
  ...props
}) => {
  const { t } = useTranslation()
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.validity.valid) {
      onUserInput(e.currentTarget.value.replace(/,/g, '.'))
    }
  }

  return (
    <>
      <StyledBalanceInput isWarning={isWarning} {...props}>
        <Flex width="100%" justifyContent="space-between" alignItems="center">
          <Text>{t('Stake')}</Text>
          <Flex alignItems="center">
            <Text>
              {t('Balance')}：{formatNumber(balance)}
            </Text>
            <Button scale="xs" mx="5px" p="4px 16px" variant="tertiary" onClick={setMax}>
              {t('Max')}
            </Button>
          </Flex>
        </Flex>
        <Flex justifyContent="flex-end">
          <Flex width="100%">
            {appendComponent}
            <Box width="100%">
              <Flex alignItems="center">
                <StyledInput
                  pattern={`^[0-9]*[.,]?[0-9]{0,${decimals}}$`}
                  inputMode="decimal"
                  min="0"
                  value={value}
                  onChange={handleOnChange}
                  placeholder={placeholder}
                  ref={innerRef}
                  {...inputProps}
                />
                {unit && <UnitContainer>{unit}</UnitContainer>}
              </Flex>
              {/* {currencyValue && (
                            <Text fontSize="12px" textAlign="right" color="textSubtle">
                                {currencyValue}
                            </Text>
                        )} */}
            </Box>
          </Flex>
        </Flex>
      </StyledBalanceInput>
    </>
  )
}

export default StakeInput
