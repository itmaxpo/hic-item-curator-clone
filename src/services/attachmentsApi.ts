import { getJson, postJson } from './request'
import { mockAttachments, isLighthouseMode } from './mocks'

export type ItemType =
  | 'planet'
  | 'activity'
  | 'continent'
  | 'admin_area'
  | 'accommodation'
  | 'touristic_area'
  | 'country'

interface IPreSignedPost {
  url: string
  fields: {
    key: string
    [prop: string]: string
  }
}

const createPreSignedPost = async ({
  itemId,
  filename,
  itemType
}: {
  itemId: string
  itemType?: ItemType
  filename: string
}) =>
  postJson<{ data: IPreSignedPost }>(
    `${process.env.REACT_APP_PARTNERS_API}/content/items/${itemId}/presigned_posts`,
    {
      filename,
      item_type: itemType,
      mime_type: 'image/jpeg'
    }
  )

const uploadPreSignedFile = ({ url, fields }: IPreSignedPost, file: File) => {
  let fileData = new FormData()

  for (let [key, value] of Object.entries(fields)) {
    fileData.append(key, value)
  }

  fileData.append('file', file)

  return fetch(url, { method: 'POST', body: fileData })
}

const SIZE_LIMIT = 62914560 // 60mb

export interface IAttachment {
  uuid: string
  filename: string
  height: number
  width: number
  url: string
  mime_type: string
  s3_key: string
  locale: string | null
  source: string | null
  source_key: string | null
  tags: { order: number; visible: boolean } | null
  created_at: string
  updated_at: string
  notVisible?: boolean
}

export const addAttachmentToItem = async ({
  itemId,
  itemType,
  source_key,
  file
}: {
  itemId: string
  itemType?: ItemType
  source_key?: string
  file: File
}) => {
  if (!file.type.includes('image')) {
    throw new Error('Only images are supported')
  }

  if (file.size > SIZE_LIMIT) {
    throw new Error(`File size exceeds ${SIZE_LIMIT / 1024 / 1024}MB`)
  }

  let { data: preSignedPost } = await createPreSignedPost({ itemId, itemType, filename: file.name })

  await uploadPreSignedFile(preSignedPost, file)

  let { data: uploadedFile } = await postJson<{ data: IAttachment }>(
    `${process.env.REACT_APP_PARTNERS_API}/content/items/${itemId}/attachments`,
    {
      filename: file.name,
      mime_type: 'image/jpeg',
      s3_key: preSignedPost.fields.key,
      item_type: itemType,
      source_key
    }
  )

  return uploadedFile
}

export const getItemAttachments = async ({
  itemId,
  offset = 0,
  limit = 50,
  itemType
}: {
  itemId: string
  offset?: number
  limit?: number
  itemType: ItemType
}): Promise<IAttachment[]> => {
  if (isLighthouseMode()) return (mockAttachments as unknown) as IAttachment[]

  let { data } = await getJson<{ data: IAttachment[] }>(
    `${process.env.REACT_APP_PARTNERS_API}/content/items/${itemId}/attachments`,
    {
      offset,
      limit,
      item_type: itemType
    }
  )

  return data
}
