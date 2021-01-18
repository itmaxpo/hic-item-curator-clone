import { lazy, Suspense } from 'react'
import LazyLoad from 'react-lazyload'
import cuid from 'cuid'
import { useNotification } from 'components/Notification'
import { Skeleton } from '@tourlane/tourlane-ui'
import { capitalizeBy } from 'pages/Item/utils'
import { addAttachmentToItem } from '../../services/attachmentsApi'
import { allSettled } from '../../utils/promise'
const UploadImageBlock = lazy(() => import(/* webpackChunkName: "UploadImageBlock" */ './styles'))

const DraggableGallery = lazy(() =>
  import(/* webpackChunkName: "DraggableGallery" */ 'components/DraggableGallery')
)

/**
 * This is a component to upload images and add them to library
 *
 * @name ImageUploader
 * @param {Function} onUploadDrop
 * @param {Boolean} isEditing
 */
const ImageUploader = ({
  id,
  allImages,
  visibleImages,
  onImagesUpdate,
  onImagesAdd,
  isEditing
}) => {
  const { enqueueNotification } = useNotification()

  const options = {
    direction: 'horizontal',
    animation: 150,
    group: {
      name: 'shared'
    }
  }

  const onUploadDrop = async (files, imageSource) => {
    const filesToFetch = files
      .filter((file) => file.type.includes('image'))
      .map((file) => ({
        id: cuid(),
        value: '',
        isLoading: true,
        isSelected: false,
        isVisible: false,
        fileName: file.name,
        file
      }))
    // Set images locally to show isLoading state
    onImagesUpdate('allImages', [...filesToFetch, ...allImages])

    let [uploaded, failedToUpload] = await allSettled(
      files.map(async (file) => {
        let { uuid, url, source_key, tags, s3_key } = await addAttachmentToItem({
          itemId: id,
          source_key: imageSource,
          file
        })

        return {
          id: uuid,
          value: url,
          s3_key,
          isLoading: false,
          isSelected: false,
          isVisible: false,
          sourceKey: capitalizeBy(source_key),
          tags
        }
      })
    )

    if (failedToUpload.length === 0) {
      enqueueNotification({
        variant: 'default',
        message: 'All images successfully uploaded!'
      })
    } else if (uploaded.length === 0) {
      enqueueNotification({
        variant: 'error',
        message: 'Failed to upload any file, check console for details.'
      })
    } else {
      enqueueNotification({
        variant: 'error',
        message: `Failed to ${failedToUpload.length} out of ${files.length} files, check console for details.`
      })
    }

    if (uploaded.length > 0) {
      onImagesAdd('allImages', uploaded)
    }

    if (failedToUpload.length > 0) {
      console.group('[ImageUploader] Failed to upload image')
      failedToUpload.forEach((e) => console.error(e))
      console.groupEnd()
    }
  }

  const onAllImagesUpdate = (items) => {
    const attachments = items.map((img, i) => ({
      ...img,
      isVisible: false
    }))
    onImagesUpdate('allImages', attachments)
  }

  const onVisibleImagesUpdate = (items) => {
    // transform images to store their current order
    const attachments = items.map((img, i) => ({
      ...img,
      isVisible: true,
      order: i
    }))

    onImagesUpdate('visibleImages', attachments)
  }

  const onVisibleImagesDelete = (items) => {
    const updatedImages = items.filter((image) => !image.isSelected)
    onImagesUpdate('visibleImages', updatedImages)
  }

  return (
    <div>
      {isEditing && (
        <LazyLoad height="386px">
          <Suspense fallback={<Skeleton height="386px" />}>
            <UploadImageBlock onFilesAdded={onUploadDrop} />
          </Suspense>
        </LazyLoad>
      )}

      {/* Showing image library only in Editing mode */}
      {isEditing && (
        <LazyLoad height="268px">
          <Suspense fallback={<Skeleton height="268px" />}>
            <DraggableGallery
              title={'Image library'}
              placeholder={'Image library (not visible)'}
              images={allImages}
              options={options}
              onChange={onAllImagesUpdate}
              disabled={!isEditing}
            />
          </Suspense>
        </LazyLoad>
      )}

      <Suspense fallback={<Skeleton height="294px" />}>
        <DraggableGallery
          title={'Visible images'}
          placeholder={`Edit content to upload images in the image library to make them visible`}
          images={visibleImages}
          options={options}
          onChange={onVisibleImagesUpdate}
          onDelete={onVisibleImagesDelete}
          disabled={!isEditing}
          isVisible={true}
        />
      </Suspense>
    </div>
  )
}

export default ImageUploader
