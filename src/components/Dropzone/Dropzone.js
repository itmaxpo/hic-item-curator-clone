import React, { useState, useRef } from 'react'
import { isEmpty } from 'lodash'
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

const Dropzone = ({ disabled = false, onFilesAdded }) => {
  const [highlight, setHighlight] = useState(false)
  const [imageSource, setImageSource] = useState()

  const fileInputRef = useRef()
  const imageSourceOptions = [
    { value: 'wetu', label: 'WETU' },
    { value: 'lonely_planet', label: 'Lonely planet' }
  ]

  const openFileDialog = () => {
    if (disabled || isEmpty(imageSource)) return
    fileInputRef.current.click()
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
    if (disabled || isEmpty(imageSource)) return
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
          <span>
            Please drag & drop images here <br />
            or browse files
          </span>
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

      <UploadButton onClick={openFileDialog} disabled={isEmpty(imageSource)}>
        Browse files
      </UploadButton>
      <MaxsizeText>Maximum upload images size: 60 MB</MaxsizeText>
    </DropzoneWrapper>
  )
}

export default Dropzone
