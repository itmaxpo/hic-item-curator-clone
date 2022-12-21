import styled from 'styled-components'
import { Control, Controller } from 'react-hook-form'
import { Base, COLORS, ErrorType, Box, Flex } from '@tourlane/tourlane-ui'
import { useHFContext, REQUIRED_ERROR_MESSAGE } from './HookForm'
import get from 'lodash/get'

interface Props {
  name: string
  control?: Control
  required?: boolean
  field: string
  isEditing?: boolean
  maxLength?: number
  rows?: number
  dataTest?: string
  placeholder?: string
  resizable?: boolean
  withBottomMargin?: boolean
  disabled?: boolean
  label?: string
}

export const Wrapper = styled(Flex)`
  border-radius: 4px;
  cursor: text;
  font-size: 15px;
  flex-direction: column;
`
export const StyledLabel = styled.label`
  display: block;
  color: ${COLORS.NIGHTINGALE_BLACK};
  font-family: 'Source Sans Pro', sans-serif;
  margin-bottom: 12px;
  font-size: 20px;
  line-height: 20px;
  font-weight: 600;
`

const LimitText = styled(Base)`
  position: absolute;
  top: 9px;
  right: 12px;
`
const TextArea = styled.textarea<any>`
  font-size: 20px;
  font-family: 'Source Sans Pro', serif;
  padding: 30px 20px 20px;
  color: ${COLORS.NIGHTINGALE_BLACK};
  border-radius: 4px;
  border: 1px solid ${COLORS.ELEMENT_GRAY};
  box-shadow: 0 1px 4px 0 rgba(63, 65, 68, 0.3);
  border: none;
  outline: none;
  ${({ resizable }) =>
    resizable ? ' resize: vertical; overflow: auto; min-height: 60px;' : 'resize: none'};
`
export const HFTextArea = ({
  field,
  maxLength,
  dataTest,
  control,
  name,
  disabled,
  required = false,
  label,
  ...props
}: Props) => {
  let formCtx = useHFContext()
  return (
    <Controller
      control={control ?? formCtx?.form.control}
      name={name}
      rules={{ required: required ? REQUIRED_ERROR_MESSAGE : '' }}
      defaultValue=""
      render={({ field: { value, ...fieldProps } }) => (
        <>
          {label && <StyledLabel>{label}</StyledLabel>}
          <Wrapper>
            {maxLength && (
              <Box position={'relative'}>
                <LimitText color={COLORS.INACTIVE_GRAY}>
                  {field.length}/{maxLength}
                </LimitText>
              </Box>
            )}
            <TextArea
              data-test={dataTest}
              maxLength={maxLength}
              {...props}
              disabled={disabled ? disabled : formCtx?.disabled}
              error={get(formCtx?.form.formState.errors, name)?.message as ErrorType}
              hideErrorOnFocus={false}
              value={value ?? ''}
              {...fieldProps}
            />
          </Wrapper>
        </>
      )}
    />
  )
}
