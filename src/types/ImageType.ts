export interface ImageType {
  id: string
  isError: boolean
  isLoading: boolean
  isSelected: boolean
  isVisible: true
  order: number
  s3_key: string
  sourceKey: string
  tags: { order: number; visible: boolean }
  value: string
}
