import styled from 'styled-components'

import { Flex, H5, Base, COLORS } from '@tourlane/tourlane-ui'

import { StyledLabel, Wrapper } from './styles'

interface Props {
  field: string
  fieldName: string
  onChange: (fieldName: string, value: string) => void
  title?: string
  isEditing?: boolean
  subtitle?: string
  maxLength?: number
  rows?: number
  dataTest?: string
  placeholder?: string
  emptyItemText?: string
}

const LimitWrapper = styled.div`
  position: relative;
`

const LimitText = styled(Base)`
  position: absolute;
  top: 9px;
  right: 12px;
`
const TextArea = styled.textarea`
  width: calc(100% - 42px);
  font-size: 20px;
  font-family: 'Source Sans Pro', serif;
  padding: 30px 20px 20px;
  color: ${COLORS.NIGHTINGALE_BLACK};
  border: none;
  outline: none;
  resize: none;
`
export const TextAreaWithHeader = ({
  title,
  subtitle,
  field,
  fieldName,
  onChange,
  isEditing,
  maxLength,
  dataTest,
  placeholder,
  emptyItemText,
  ...restProps
}: Props) => (
  <Flex px={60} direction="column" gap={20}>
    {title && <H5>{title}</H5>}

    {isEditing ? (
      <div>
        {subtitle && <StyledLabel>{subtitle}</StyledLabel>}

        <Wrapper style={{ minHeight: '100%' }} textWrap={true} {...restProps}>
          {maxLength && (
            <LimitWrapper>
              <LimitText color={COLORS.INACTIVE_GRAY}>
                {field.length}/{maxLength}
              </LimitText>
            </LimitWrapper>
          )}
          <TextArea
            data-test={dataTest}
            maxLength={maxLength}
            onChange={(e) => onChange(fieldName, e.target.value)}
            placeholder={
              placeholder ?? `Please add a ${subtitle ? subtitle?.toLowerCase() : fieldName}`
            }
            value={field}
            {...restProps}
          />
        </Wrapper>
      </div>
    ) : (
      <Base {...restProps} data-test={dataTest}>
        {field ? (
          <div style={{ whiteSpace: 'pre-wrap' }}>{field}</div>
        ) : (
          emptyItemText ?? `No ${subtitle ?? fieldName}`
        )}
      </Base>
    )}
  </Flex>
)
