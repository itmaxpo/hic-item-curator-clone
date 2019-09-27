import React from 'react'
import { MergeBigIcon, CheckIcon } from 'components/Icon'
import { H3, Flex } from '@tourlane/tourlane-ui'
import {
  StyledModal,
  StyledModalBody,
  TitleContainer,
  IconContainer,
  StyledCard,
  ItemTitleContainer,
  ItemCardsContainer,
  StyledTitle,
  StyledSubtitle,
  ButtonsContainer,
  SubmitButton,
  CancelButton
} from './styles'

const ItemCard = ({ title }) => (
  <StyledCard>
    <ItemTitleContainer direction="ttb">
      <Flex>
        <CheckIcon />
        <StyledTitle>{title}</StyledTitle>
      </Flex>
      <StyledSubtitle>Ushuaia, Argentina</StyledSubtitle>
    </ItemTitleContainer>
  </StyledCard>
)

const MergeItems = ({ isOpen, items, onClose }) => {
  return (
    <StyledModal isOpen={isOpen} onClose={onClose}>
      <StyledModalBody>
        <TitleContainer>
          <IconContainer>
            <MergeBigIcon />
          </IconContainer>
          <H3 textAlignCenter>Are you sure you want to merge these items?</H3>
        </TitleContainer>
        <ItemCardsContainer direction="ttb" alignItems="center">
          {items.map((item, index) => (
            <ItemCard key={index} {...item} />
          ))}
        </ItemCardsContainer>
        <ButtonsContainer>
          <SubmitButton>{`Merge ${items.length} items`}</SubmitButton>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
        </ButtonsContainer>
      </StyledModalBody>
    </StyledModal>
  )
}

export default MergeItems
