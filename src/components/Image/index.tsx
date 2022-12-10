import { useState, FC } from 'react'
import styled from 'styled-components'
import { IAttachment } from '../../services/attachmentsApi'
import { useNotification } from 'components/Notification'
import { Base, Flex, Image, AlarmButton, IconCircle, Card } from '@tourlane/tourlane-ui'
import DeleteIcon from '@tourlane/iconography/Glyphs/Navigation/Delete'
import { UnhappyIcon } from '../../components/Icon'

const formSpacing = [12, 12, 15, 18, 24]

const IconCircleStyled = styled(IconCircle)`
  cursor: pointer;
  position: absolute;
  top: -16px;
  right: -16px;
  z-index: 1;
`
const IMAGE_SIZE = 120

const ImageCard: FC<{ onClick?: (...args: any[]) => void; children: React.ReactNode }> = ({
  children,
  onClick
}) => (
  <Card onClick={onClick} height={IMAGE_SIZE} width={IMAGE_SIZE} withOverflowHidden withHover>
    {children}
  </Card>
)

export const Images: FC<{
  images: IAttachment[]
  onImageClick: (i: number) => void
  isEditing: boolean
  onDelete: (uuid: string, i: number) => void
}> = ({ images, onImageClick, isEditing, onDelete }) => {
  const { enqueueNotification } = useNotification()
  const [imagesIdsToDelete, setImagesToDelete] = useState(() => new Set())

  // We don't allow to delete the last image.
  const numberOfImagesInUI = images.length - imagesIdsToDelete.size
  const isDeleteEnabled = numberOfImagesInUI > 1

  return images.length && !images?.every(({ uuid }) => imagesIdsToDelete.has(uuid)) ? (
    <Flex gap={formSpacing} flexWrap="wrap">
      {images
        .filter(({ uuid }) => !imagesIdsToDelete.has(uuid))
        .map(({ url, filename, uuid }, i) => (
          <div key={uuid} style={{ position: 'relative' }}>
            {isEditing && isDeleteEnabled && (
              <IconCircleStyled
                icon={<DeleteIcon />}
                sizeVariant="tiny"
                onClick={() => {
                  setImagesToDelete((s) => new Set(s).add(uuid))

                  const closeNotification = enqueueNotification({
                    variant: 'alarm',
                    type: 'block',
                    borderDirection: 'bottom',
                    onClose: () => onDelete(uuid, i),
                    message: (
                      <Flex justifyContent="space-between" alignItems="center">
                        <Base strong>Image deleted ({filename})</Base>

                        <AlarmButton
                          size="small"
                          onClick={() => {
                            closeNotification(false)
                            setImagesToDelete((s) => {
                              const d = new Set(s)
                              d.delete(uuid)
                              return d
                            })
                          }}
                        >
                          UNDO
                        </AlarmButton>
                      </Flex>
                    )
                  })
                }}
              />
            )}

            <ImageCard
              key={url}
              onClick={(e: Event) => {
                // For some reason, react-hook-form tries to submit the form unless I do this.
                e.preventDefault()

                onImageClick(i)
              }}
            >
              <Image src={url} height={IMAGE_SIZE} />
            </ImageCard>
          </div>
        ))}
    </Flex>
  ) : (
    <ImageCard>
      <Flex justifyContent="center" alignItems="center" fullHeight>
        <UnhappyIcon />
      </Flex>
    </ImageCard>
  )
}
