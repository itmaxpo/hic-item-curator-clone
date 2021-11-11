import { postJson } from './request'

interface MergeItemsValidateResponse {
  warnings: string[]
}

interface MergeItemsValidatePayload {
  item_uuids: string[]
}

/**
 * Pre-validates the items for merging.
 */
export const mergeItemsValidate = async (ids: string[]) => {
  let res = await postJson<MergeItemsValidateResponse, MergeItemsValidatePayload>(
    `${process.env.REACT_APP_PARTNERS_API}/content/items/merge_validation`,
    {
      item_uuids: ids
    }
  )

  return res
}
