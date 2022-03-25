import type { OfferPreviewType } from 'pages/Item/OfferVisualisation/Intro/Intro'
import { ImageType } from './ImageType'

export interface PageProps {
  type: string
  field: string
  fieldName: string
  onChange: (name: string, value: OfferPreviewType | string) => void
  onImagesAdd: () => void
  isLoadingAdditionalInfo: boolean
  onGeolocationUpdate: () => void
  name: string
  address: string
  geolocation: { lon: number; lat: number }
  polygon: { lat: number; lon: number }[]
  original_name: string
  isEditing: boolean
  offer_preview: OfferPreviewType
  title?: string
  description?: string
  subtitle?: string
  descriptionInspiration?: string
  id?: string
  allImages: ImageType[]
  visibleImages: ImageType[]
}
