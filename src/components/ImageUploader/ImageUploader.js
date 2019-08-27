import React, { useReducer } from 'react'
import DraggableGallery from 'components/DraggableGallery'
import { UploadImageBlock } from './styles'

// Reducer to handle images all and visible changes
const reducer = (state, action) => {
  switch (action.type) {
    case 'updateField':
      return {
        ...state,
        [action.field]: action.value
      }

    default:
      throw new Error()
  }
}

/**
 * This is a component to upload images and add them to library
 *
 * @name ImageUploader
 * @param {Function} onUploadDrop
 * @param {Array<String>} images
 * @param {Function} onImagesChange
 * @returns {Object} ImageUploader
 */
const ImageUploader = ({ itemId, isEditing, images, onImagesUpdate }) => {
  const [{ visibleImages, allImages }, dispatch] = useReducer(reducer, {
    allImages: images.filter(image => !image.isVisible),
    visibleImages: images.filter(image => image.isVisible)
  })

  const setVisibleImages = items => {
    dispatch({ type: 'updateField', field: 'visibleImages', value: items })
  }

  const setAllImages = items => {
    dispatch({ type: 'updateField', field: 'allImages', value: items })
  }

  const options = {
    direction: 'horizontal',
    animation: 150,
    group: {
      name: 'shared'
    }
  }

  const optionsNoPut = {
    direction: 'horizontal',
    animation: 150,
    group: {
      name: 'shared',
      put: false
    }
  }

  const onUploadDrop = files => {
    // setLoadingImages(files.length)

    // Uploading files send a BE request
    console.log('onUploadDrop', files)
    // Will receive array of URL's
    const URLs = [
      {
        isLoading: true,
        isError: false,
        isSelected: false,
        isVisible: false,
        value: 'https://loremflickr.com/320/240/travel'
      },
      {
        isLoading: true,
        isError: false,
        isSelected: false,
        isVisible: false,
        value: 'https://loremflickr.com/320/240/travel'
      }
    ]

    setAllImages([...URLs, ...allImages])
    fakeImageSending(URLs).then(uploadedImages => {
      const filteredAllImages = allImages.filter(image => !image.isLoading)
      setAllImages([...uploadedImages, ...filteredAllImages], () => {
        onImagesUpdate([...uploadedImages, ...filteredAllImages, ...visibleImages])
      })
    })
  }

  const fakeImageSending = () => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res([
          {
            isLoading: false,
            isError: false,
            isSelected: false,
            isVisible: false,
            value: 'https://loremflickr.com/320/240/travel'
          },
          {
            isLoading: false,
            isError: false,
            isSelected: false,
            isVisible: false,
            value: 'https://loremflickr.com/320/240/travel'
          }
        ])
        // Error handling here
      }, 1000)
    })
  }

  const onAllImagesUpdate = (items, type) => {
    // We can't delete from all images area
    if (type === 'remove') return
    setAllImages(items, () => {
      onImagesUpdate([...items, ...visibleImages])
    })
  }

  const onVisibleImagesUpdate = items => {
    setVisibleImages(items, () => {
      onImagesUpdate([...allImages, ...items])
    })
  }

  return (
    <div>
      {isEditing && <UploadImageBlock onFilesAdded={onUploadDrop} />}

      <DraggableGallery
        title={'Image library'}
        placeholder={'Image library'}
        images={allImages}
        options={optionsNoPut}
        onChange={onAllImagesUpdate}
        disabled={!isEditing}
      />

      <DraggableGallery
        title={'Visible images'}
        placeholder={'Drop images here to make them visible'}
        images={visibleImages}
        options={options}
        onChange={onVisibleImagesUpdate}
        disabled={!isEditing}
        isVisible={true}
      />
    </div>
  )
}

export default ImageUploader
