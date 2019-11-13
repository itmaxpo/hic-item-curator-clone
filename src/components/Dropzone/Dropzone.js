import React, { lazy, Suspense, useState, useRef } from 'react'
import { isEmpty } from 'lodash'
import LazyLoad from 'react-lazyload'
import { Skeleton } from '@tourlane/tourlane-ui'
import {
  DropzoneWrapper,
  InputWrapper,
  UploadButton,
  IconText,
  ImageSourceDropdown,
  MaxsizeText,
  IconJumpy
} from './styles'
import { HappyFileIcon, SadFileIcon } from 'components/Icon'
import { SHUTTERSTOCK } from 'utils/constants'

const ImageSearch = lazy(() =>
  import(/* webpackChunkName: "ImageSearch" */ 'components/ImageSearch')
)

/**
 * Dropzone
 *
 * @param {Function} onFilesAdded
 * @param {Boolean} disabled
 */
const Dropzone = ({ disabled = false, onFilesAdded }) => {
  const [highlight, setHighlight] = useState(false)
  const [imageSource, setImageSource] = useState()

  const fileInputRef = useRef()
  const imageSourceOptions = [
    { value: 'wetu', label: 'WETU' },
    { value: 'lonely_planet', label: 'Lonely planet' },
    { value: SHUTTERSTOCK, label: 'Shutterstock' }
  ]
  // Dynamically change explanation text on imageSource changed
  const imageSourceText = {
    wetu: `Please drag & drop images here \n or browse files`,
    lonely_planet: `Please drag & drop images here \n or browse files`,
    [SHUTTERSTOCK]: `Please use search to find images`
  }

  const openFileDialog = () => {
    if (disabled || isEmpty(imageSource)) return
    fileInputRef.current.click()
  }

  const onImageUpload = array => {
    onFilesAdded(array, imageSource)
  }

  const onFilesAddedHandler = evt => {
    if (disabled || isEmpty(imageSource)) return
    const files = evt.target.files
    if (onFilesAdded) {
      const array = fileListToArray(files)
      onFilesAdded(array, imageSource)
    }
  }

  const onDragOver = evt => {
    evt.preventDefault()
    if (disabled || isEmpty(imageSource) || imageSource === SHUTTERSTOCK) return
    setHighlight(true)
  }

  const onDragLeave = () => {
    setHighlight(false)
  }

  const onDrop = evt => {
    evt.preventDefault()

    if (disabled || isEmpty(imageSource)) return

    const files = evt.dataTransfer.files
    if (onFilesAdded) {
      const array = fileListToArray(files)
      onFilesAdded(array, imageSource)
    }

    setHighlight(false)
  }

  const fileListToArray = list => {
    const array = []
    for (var i = 0; i < list.length; i++) {
      array.push(list.item(i))
    }
    return array
  }

  return (
    <DropzoneWrapper
      p={0}
      direction={'ttb'}
      alignItems={'center'}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <InputWrapper
        ref={fileInputRef}
        className="FileInput"
        type="file"
        multiple
        onChange={onFilesAddedHandler}
      />

      {!isEmpty(imageSource) ? (
        <IconJumpy highlight={highlight}>
          <HappyFileIcon />
        </IconJumpy>
      ) : (
        <IconJumpy highlight={highlight}>
          <SadFileIcon />
        </IconJumpy>
      )}

      <IconText>
        {!imageSource ? (
          <span>
            Please select an image source first <br /> in order to be able to upload.
          </span>
        ) : (
          <span>{imageSourceText[imageSource]}</span>
        )}
      </IconText>
      <div data-test={'select-image-source'}>
        <ImageSourceDropdown
          placeholder={'Select image source'}
          options={imageSourceOptions}
          value={imageSource}
          onChange={setImageSource}
        />
      </div>

      {imageSource === SHUTTERSTOCK && (
        <LazyLoad height="900px">
          <Suspense fallback={<Skeleton height="900px" />}>
            <ImageSearch onImageUpload={onImageUpload} />
          </Suspense>
        </LazyLoad>
      )}

      {imageSource !== SHUTTERSTOCK && (
        <UploadButton onClick={openFileDialog} disabled={isEmpty(imageSource)}>
          Browse files
        </UploadButton>
      )}
      <MaxsizeText id={'maximum-size'}>Maximum upload images size: 60 MB</MaxsizeText>
    </DropzoneWrapper>
  )
}

export default Dropzone
