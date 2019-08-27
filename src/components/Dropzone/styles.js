import styled, { css } from 'styled-components'
import { FlexContainer, COLORS, Button, Big, Dropdown, ExtraSmall } from '@tourlane/tourlane-ui'

export const DropzoneWrapper = styled(FlexContainer)`
  height: 388px;
  width: 100%;
  padding: 50px 0 !important;
  position: relative;
  border: 1px dashed ${COLORS.ELEMENT_GRAY};
  border-radius: 4px;
  background-color: ${COLORS.SENSATION_WHITE};
`
export const IconJumpy = styled.span`
  ${({ highlight }) => highlight && `${DraggingFileAnimation}`}
`

export const InputWrapper = styled.input`
  display: none;
`

export const UploadButton = styled(Button)``

export const IconText = styled(Big)`
  margin: 20px 0;
  text-align: center;
  font-weight: 600;
`

export const ImageSourceDropdown = styled(Dropdown)`
  margin-bottom: 20px;
  width: 350px;
`

export const MaxsizeText = styled(ExtraSmall)`
  margin-top: 20px;
  color: ${COLORS.INACTIVE_GRAY};
`

export const DraggingFileAnimation = css`
  && svg {
    -webkit-animation: jump 1.2s ease-out 0s infinite normal;
    animation: jump 1.2s ease-out 0s infinite normal;
  }

  @-webkit-keyframes jump {
    0% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    20% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    40% {
      -webkit-transform: translateY(-30px);
      transform: translateY(-30px);
    }
    50% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    60% {
      -webkit-transform: translateY(-15px);
      transform: translateY(-15px);
    }
    80% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
  }

  @keyframes jump {
    0% {
      transform: translateY(0);
    }
    20% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-30px);
    }
    50% {
      transform: translateY(0);
    }
    60% {
      transform: translateY(-15px);
    }
    80% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(0);
    }
  }
`
