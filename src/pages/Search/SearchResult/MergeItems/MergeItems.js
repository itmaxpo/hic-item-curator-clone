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
    <StyledCard data-test="item">
      <ItemTitleContainer direction="ttb">
        <Flex>
          <CheckIcon />
          <StyledTitle data-test="title">{title}</StyledTitle>
        </Flex>
        <StyledSubtitle data-test="subtitle">{subtitle}</StyledSubtitle>
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

      // 2.5s delay to let progress button animation finish
      setTimeout(() => {
        enqueueNotification({
          message: '🥳  Successfully merged',
          'data-test': 'merge-notification'
        })
        onMerge(parseMergedItem(data), itemsToMerge)
        onClose()
      }, 2720)
    } catch (e) {
      enqueueNotification({ variant: 'error', message: 'Items could not be merged' })
      onClose()
      return
    }
  }

  return (
    <StyledModal isOpen={isOpen} onClose={onClose}>
      <StyledModalBody data-test="mergeItems">
        <TitleContainer>
          <IconContainer>
            <MergeBigIcon />
          </IconContainer>
          <H3 textAlignCenter>Are you sure you want to merge these items?</H3>
        </TitleContainer>
        <ItemCardsContainer data-test="items" direction="ttb" alignItems="center">
          {items.map((item, index) => (
            <ItemCard key={index} {...item} country={country} />
          ))}
        </ItemCardsContainer>
        <ButtonsContainer data-test="merge">
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
