import { useState, Suspense } from 'react'
import { Flex, H5, Box } from '@tourlane/tourlane-ui'
import { ItemImagesUpload } from 'components/ItemImagesUpload'
import { useNotification } from 'components/Notification'
import { formSpacing } from 'utils/constants'
import { useParams } from 'react-router-dom'
import { usePromise } from 'utils/usePromise'
import { getItemAttachments } from 'services/attachmentsApi'
import { Images } from 'components/Image'
import { CarouselLoader } from 'components/Carousel'
import { updateItemAttachmentsById } from 'services/contentApi'
import ImageCarousel from 'components/Carousel'

interface Props {
  isEditing: boolean
  errorMessage: string
}

export const AreaImages = ({ isEditing, errorMessage }: Props) => {
  const { id } = useParams()
  const { enqueueNotification } = useNotification()
  const [isImageCarouselOpen, toggleImageCarousel] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const [{ data: images = [] }, reFetchImages] = usePromise(async () => {
    const images = await getItemAttachments({ itemId: id as string, itemType: 'admin_area' })
    return images.filter(({ tags }) => tags?.visible !== false)
  }, [])

  return (
    <Box mt={40}>
      <H5 withBottomMargin>Images</H5>

      <Flex gap={formSpacing}>
        {isEditing && (
          <Flex flex={1} direction="column">
            <ItemImagesUpload
              itemId={id as string}
              itemType="admin_area"
              onUpload={reFetchImages}
              error={errorMessage}
            />
          </Flex>
        )}

        <Flex flex={1}>
          <Images
            images={images}
            isEditing={isEditing}
            onImageClick={(i) => {
              setSelectedImageIndex(i)
              toggleImageCarousel(true)
            }}
            onDelete={async (imageId, imageOrder) => {
              try {
                const deletedImage: any = await updateItemAttachmentsById(
                  id as string,
                  'admin_area',
                  [{ id: imageId, order: imageOrder }] as any,
                  false
                )

                reFetchImages()

                if (deletedImage[0]?.error?.length > 0) {
                  throw Error(deletedImage[0].error.join(', '))
                }
              } catch (e) {
                if (e instanceof Error) {
                  enqueueNotification({
                    variant: 'error',
                    message: `Failed to update image. ${e?.message}`
                  })
                  console.error(e)
                }
              }
            }}
          />
        </Flex>
      </Flex>

      {isImageCarouselOpen && (
        <Suspense fallback={<CarouselLoader />}>
          {/*@ts-ignore*/}
          <ImageCarousel
            selectedItem={selectedImageIndex}
            images={images}
            open={isImageCarouselOpen}
            onClose={() => toggleImageCarousel(false)}
          />
        </Suspense>
      )}
    </Box>
  )
}
