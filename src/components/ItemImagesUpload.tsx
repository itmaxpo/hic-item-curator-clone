import { Upload } from '@tourlane/tourlane-ui'
import { allSettled } from '../utils/promise'
import { addAttachmentToItem, ItemType } from '../services/attachmentsApi'
import { useNotification } from './Notification'
import { useState } from 'react'

interface Props {
  itemId: string
  itemType?: ItemType
  onUpload: () => void
}

export const ItemImagesUpload = ({ itemType, itemId, onUpload }: Props) => {
  let { enqueueNotification } = useNotification()
  let [isUploading, setIsUploading] = useState(false)
  let [error, setError] = useState<string | null>(null)

  return (
    <Upload
      files={[]}
      multiple
      accept="image/*"
      error={error}
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

        if (uploaded.length === files.length) {
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
