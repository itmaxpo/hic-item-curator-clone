import React, { useRef } from 'react'
import cuid from 'cuid'
import {
  getItemAttachmentsPresignedPost,
  uploadingImage,
  setItemAttachmentsById
} from 'services/contentApi'
import DraggableGallery from 'components/DraggableGallery'
import { UploadImageBlock } from './styles'

/**
 * This is a component to upload images and add them to library
 *
 * @name ImageUploader
 * @param {Function} onUploadDrop
 * @param {Array<String>} images
 * @param {Boolean} isEditing
 * @param {Boolean} isSaved

 * @returns {Object} ImageUploader
 */
const ImageUploader = ({
  id,
  allImages,
  visibleImages,
  onImagesUpdate,
  onImagesAdd,
  isEditing
}) => {
  const fetchedImages = useRef([])

  const options = {
    direction: 'horizontal',
    animation: 150,
    group: {
      name: 'shared'
    }
  }

  const onUploadDrop = (files, imageSource) => {
    fetchedImages.current = []
    // Will receive array of URL's to show user that images are loading
    const filesToFetch = files.map((file, i) => ({
      id: cuid(),
      value: '',
      isLoading: true,
      isError: file.size > 62914560,
      isSelected: false,
      isVisible: false,
      fileName: file.name,
      file
    }))
    // Set images locally to show isLoading state
    onImagesUpdate('allImages', [...filesToFetch, ...allImages])
    // Filter to handle only JPEG/PNG images and fetch images and presigned_posts
    filesToFetch
      .filter(file => file.type !== 'image/jpeg' || file.type !== 'image/png')
      .forEach((file, i) => {
        try {
          if (file.isError) {
            throw Error({ message: 'file size exceeds' })
          } else {
            getItemAttachmentsPresignedPost(id, file).then(uploadedPost => {
              const url = uploadedPost.data.url
              const s3Key = uploadedPost.data.fields.key
              const s3stuff = uploadedPost.data.fields

              const fileData = new FormData()

              Object.keys(uploadedPost.data.fields).forEach(key => {
                fileData.append(key, uploadedPost.data.fields[key])
              })
              fileData.append('file', file.file)

              uploadingImage(url, fileData, s3stuff).then(data => {
                setItemAttachmentsById(id, file.fileName, s3Key, imageSource).then(fileUrl => {
                  const fetchedFile = {
                    id: fileUrl.data.uuid,
                    order: undefined,
                    value: fileUrl.data.url,
                    isLoading: false,
                    isError: false,
                    isSelected: false,
                    isVisible: false,
                    sourceKey: fileUrl.source_key,
                    tags: fileUrl.data.tags
                  }

                  fetchedImages.current = [fetchedFile, ...fetchedImages.current]

                  if (fetchedImages.current.length === files.length) {
                    onImagesAdd('allImages', [...fetchedImages.current])
                  }
                })
              })
            })
          }
        } catch (e) {
          console.error(e)
        }
      })
  }

  const onAllImagesUpdate = items => {
    const attachments = items.map((img, i) => ({
      ...img,
      isVisible: false
    }))
    onImagesUpdate('allImages', attachments)
  }

  const onVisibleImagesUpdate = items => {
    // transform images to store their current order
    const attachments = items.map((img, i) => ({
      ...img,
      isVisible: true,
      order: i
    }))

    onImagesUpdate('visibleImages', attachments)
  }

  const onVisibleImagesDelete = items => {
    const updatedImages = items.filter(image => !image.isSelected)
    onImagesUpdate('visibleImages', updatedImages)
  }

  return (
    <div>
      {isEditing && <UploadImageBlock onFilesAdded={onUploadDrop} />}
      {/* Showing image library only in Editing mode */}
      {isEditing && (
        <DraggableGallery
          title={'Image library'}
          placeholder={'Image library'}
          images={allImages}
          options={options}
          onChange={onAllImagesUpdate}
          disabled={!isEditing}
        />
      )}

      <DraggableGallery
        title={'Visible images'}
        placeholder={`Drag & drop images from the image library here to make them visible`}
        images={visibleImages}
        options={options}
        onChange={onVisibleImagesUpdate}
        onDelete={onVisibleImagesDelete}
        disabled={!isEditing}
        isVisible={true}
      />
    </div>
  )
}

export default ImageUploader
