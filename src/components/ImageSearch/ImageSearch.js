import React, { useState, useRef } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { shutterStockImages } from 'services/shutterstockApi'
import { FlexContainer } from '@tourlane/tourlane-ui'
import { isEmpty } from 'lodash'
import {
  StyledTextField,
  StyledButton,
  Wrapper,
  ImageSearchWrapper,
  ResultsWrapper,
  ImageCard,
  ImageWrapper,
  StyledImg,
  StyledP
} from './styles'
import { CheckboxWrapper } from 'components/DraggableGallery/styles'
import Loader from 'components/Loader'
import { scrollToItemManager } from 'utils/ScrollToItemManager'

/**
 * Add support of searching images via shutterstock API
 * After selecting image user can click Upload button and add images
 *
 * @param {Function} onImageUpload
 */
const ImageSearch = ({ onImageUpload = () => {} }) => {
  const searchPage = useRef(1)
  const [searchResults, setResults] = useState([])
  const [selectedItems, setItems] = useState([])
  const [searchQuery, setQuery] = useState('')

  scrollToItemManager.setItemToScrollTo('image-library')

  const changeQuery = e => {
    setQuery(e.target.value)
  }

  const search = () => {
    shutterStockImages(searchQuery).then(res => {
      setResults(res)
    })
  }

  const loadMore = () => {
    searchPage.current = searchPage.current + 1
    shutterStockImages(searchQuery, searchPage.current).then(res => {
      setResults([...searchResults, ...res])
    })
  }

  const toggleImage = url => {
    if (selectedItems.some(u => u === url)) {
      setItems(selectedItems.filter(u => u !== url))
    } else {
      setItems([...selectedItems, url])
    }
  }

  const downloadImages = () => {
    Promise.all(selectedItems.map(url => downloadImage(url))).then(async images => {
      await onImageUpload(images)
      setItems([])
      scrollToItemManager.scrollToItem()
    })
  }

  const downloadImage = async url => {
    return await fetch(url)
      .then(res => res.blob()) // Gets the response and returns it as a blob
      .then(blob => new File([blob], 'image', { type: 'image/jpg', lastModified: new Date() }))
  }
  // Hiding gradient when first row scrolled down
  const onScroll = e => {
    const elem = document.getElementById('gradient-top')
    if (e.target.scrollTop >= 300) {
      if (elem.style.visibility === 'hidden') {
        elem.style.visibility = 'visible'
      }
    } else {
      elem.style.visibility = 'hidden'
    }
  }

  return (
    <ImageSearchWrapper direction={'ttb'} alignItems={'center'} p={0}>
      <StyledTextField onChange={changeQuery} placeholder={'Search for image'} />
      <StyledButton onClick={search} disabled={isEmpty(searchQuery)}>
        Search
      </StyledButton>
      {searchResults.length > 0 && (
        <Wrapper>
          <div id="gradient-top"></div>
          <ResultsWrapper onScroll={onScroll}>
            <InfiniteScroll
              pageStart={searchPage.current}
              loadMore={loadMore}
              hasMore={true || false}
              loader={<Loader key={'unique'} />}
              useWindow={false}
            >
              {searchResults &&
                searchResults.map((res, i) => (
                  <ImageCard
                    key={res.mediaUrl}
                    index={i}
                    onClick={() => toggleImage(res.mediaUrl)}
                    withHover
                  >
                    <FlexContainer direction={'ttb'} p={0}>
                      <CheckboxWrapper
                        checked={selectedItems.some(u => u === res.mediaUrl)}
                        onClick={e => e.preventDefault()}
                      />
                      <ImageWrapper>
                        <StyledImg src={res.mediaUrl} alt={res.mediaUrl} />
                      </ImageWrapper>
                      <StyledP>1.82$</StyledP>
                    </FlexContainer>
                  </ImageCard>
                ))}
            </InfiniteScroll>
            <div id="gradient"></div>
          </ResultsWrapper>

          <StyledButton onClick={downloadImages} disabled={selectedItems.length === 0}>
            Upload
          </StyledButton>
        </Wrapper>
      )}
    </ImageSearchWrapper>
  )
}

export default ImageSearch
