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
import { mergeItems } from 'services/contentApi'
import { useNotification } from 'components/Notification'
import { parseMergedItem } from './utils'

const ItemCard = ({ title, area, country }) => {
  const subtitle = area ? `${area}, ${country}` : country

  return (
    <StyledCard>
      <ItemTitleContainer direction="ttb">
        <Flex>
          <CheckIcon />
          <StyledTitle>{title}</StyledTitle>
        </Flex>
        <StyledSubtitle>{subtitle}</StyledSubtitle>
      </ItemTitleContainer>
    </StyledCard>
  )
}

const MergeItems = ({ onMerge, onClose, isOpen, items, country }) => {
  const { enqueueNotification } = useNotification()

  const onMergeHandler = async () => {
    const itemsToMerge = [...items]
    try {
      const { data } = await mergeItems(itemsToMerge.map(item => item.id))

      if (!data) {
        enqueueNotification({ variant: 'error', message: 'Items could not be merged' })
        onClose()
        return
      }

      // 2.5s delay to let progress button animation finish
      setTimeout(() => {
        enqueueNotification({ message: '🥳  Successfully merged' })
        onMerge(parseMergedItem(data), itemsToMerge)
        onClose()
      }, 2720)
    } catch (e) {
      console.warn(e)
    }
  }

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
            <ItemCard key={index} {...item} country={country} />
          ))}
        </ItemCardsContainer>
        <ButtonsContainer>
          <SubmitButton
            onButtonClick={onMergeHandler}
            mockUpload
            uploadTime={1500}
          >{`Merge ${items.length} items`}</SubmitButton>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
        </ButtonsContainer>
      </StyledModalBody>
    </StyledModal>
  )
}

export default MergeItems