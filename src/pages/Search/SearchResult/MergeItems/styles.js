import styled from 'styled-components'
import {
  Modal,
  ModalBody,
  Card,
  Flex,
  Subline,
  COLORS,
  ProgressButton,
  SecondaryButton
} from '@tourlane/tourlane-ui'

export const StyledModal = styled(Modal)`
  width: 800px;
  min-height: 540px;
`

export const StyledModalBody = styled(ModalBody)`
  && {
    padding: 24px 60px 60px 60px;
  }
`

export const TitleContainer = styled.div`
  width: 300px;
  margin: auto;
  margin-bottom: 30px;
`

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`

export const StyledCard = styled(Card)`
  width: 680px;
  height: 118px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`

export const ItemTitleContainer = styled(Flex)`
  margin-left: 26px;

  & span {
    margin-right: 12px;
  }

  > p {
    margin-left: 36px;
  }
`

export const ItemCardsContainer = styled(Flex)``

export const StyledTitle = styled(Subline)`
  && {
    font-size: 22px;
  }
`

export const StyledSubtitle = styled(Subline)`
  && {
    font-size: 18px;
    color: ${COLORS.INACTIVE_GRAY};
  }
`

export const ButtonsContainer = styled(Flex)`
  height: 48px;
  justify-content: space-between;
`

export const SubmitButton = styled(ProgressButton)`
  width: 390px;

  > button {
    width: 390px;
  }
`

export const CancelButton = styled(SecondaryButton)`
  width: 270px;

  && {
    color: ${COLORS.RIOJA_RED};
  }
`

export const MergeWarningsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 15px;
  margin-bottom: 40px;
`
