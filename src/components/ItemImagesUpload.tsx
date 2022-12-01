import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Upload, COLORS, Link } from '@tourlane/tourlane-ui'
import { allSettled } from '../utils/promise'
import { imageAcceptedFormat } from '../utils/imageFormat'
import { addAttachmentToItem, ItemType } from '../services/attachmentsApi'
import { useNotification } from 'components/Notification'

export const StyledUpload = styled(Upload)`
  p {
    margin: 3px 0;
  }
  ${({ error }) => error && `border: 1px solid ${COLORS.RIOJA_RED};`}
`

interface Props {
  itemId: string
  itemType?: ItemType
  onUpload: () => void
  error?: string
}

export const ItemImagesUpload = ({ itemType, itemId, onUpload, ...props }: Props) => {
  let { enqueueNotification } = useNotification()
  let [isUploading, setIsUploading] = useState(false)
  let [error, setError] = useState<string | null>(null)

  // update error when error prop changes
  useEffect(() => {
    setError(props.error ?? null)
  }, [props.error])

  return (
    <StyledUpload
      files={[]}
      multiple
      accept={imageAcceptedFormat}
      error={error}
      subTitle={
        <>
          <p>
            Drag and drop file here or <Link>browse</Link>
          </p>
          <p>
            <strong>Supported format:</strong>{' '}
            <em>{imageAcceptedFormat.map((item) => item.split('/')[1]).join(', ')}</em>
          </p>
        </>
      }
      onDropRejected={(files) => {
        const errors = files.map((item) => `${item.file.name} - ${item.file.type} is not supported`)
        setError(errors.join(','))
      }}
      disabled={isUploading}
      onSubmitFiles={async (files) => {
        setIsUploading(true)
        setError(null)

        let [uploaded, failed] = await allSettled(
          files.map((file) =>
            addAttachmentToItem({
              itemId,
              itemType,
              file
            })
          )
        )

        setIsUploading(false)

        if (uploaded.length === files.length && files.length !== 0) {
          enqueueNotification({
            variant: 'default',
            message: 'All images successfully uploaded'
          })
        } else if (uploaded.length > 0) {
          enqueueNotification({
            variant: 'default',
            message: `Uploaded ${uploaded.length} out of ${files.length} images`
          })
        } else {
          // uploaded.length === 0
          enqueueNotification({
            variant: 'error',
            message: 'Failed to upload image[s]'
          })
        }

        if (failed.length > 0) {
          setError(failed.map((e) => e.message ?? e).join(', '))
          console.group('[ItemImagesUpload] Failed to upload')
          failed.forEach((e) => console.error(e))
          console.groupEnd()
        }

        if (uploaded.length > 0) {
          onUpload()
        }
      }}
    />
  )
}
