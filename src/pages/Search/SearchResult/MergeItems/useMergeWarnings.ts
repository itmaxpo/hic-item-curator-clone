import { useEffect, useState } from 'react'
import { useNotification } from '@tourlane/tourlane-ui'

import { mergeItemsValidate } from 'services/contentApiTs'

interface IItem {
  id: string
  type: string
}

/**
 * Hook to keep track of merge warnings.
 */
export const useMergeWarnings = (items: IItem[], onClose: () => {}) => {
  const { enqueueNotification } = useNotification()

  // Keeps track of warnings for merging items.
  const [mergeWarnings, setMergeWarnings] = useState<string[]>([])

  // On items change, update warnings for merging of items.
  useEffect(() => {
    const updateMergeValidationWarnings = async () => {
      // If there are not enough items selected, clean up warnings and bail out.
      if (items.length < 2) {
        if (mergeWarnings.length) {
          setMergeWarnings([])
        }
        return
      }

      // Fetch warnings.
      try {
        const itemIds = items.map(({ id }) => id)
        const { warnings } = await mergeItemsValidate(itemIds)
        setMergeWarnings(warnings)
      } catch (e) {
        if (e instanceof Error) {
          enqueueNotification({
            variant: 'error',
            message: e.message ?? 'Validation of item merging failed'
          })
          onClose()
          return
        }
      }
    }

    updateMergeValidationWarnings()
  }, [enqueueNotification, items, mergeWarnings.length, onClose])

  return mergeWarnings
}
