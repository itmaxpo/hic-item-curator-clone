import { Suspense } from 'react'
import { H5, Skeleton } from '@tourlane/tourlane-ui'

import ImageUploader from 'components/ImageUploader'

import { TitleWithContent } from '../styles'
import { PageProps } from 'types/PageProps'
import { OfferPreviewType } from '../Intro/Intro'

interface Props {
  item: Omit<
    PageProps,
    | 'isEditing'
    | 'onChange'
    | 'offer_preview'
    | 'onGeolocationUpdate'
    | 'onImagesAdd'
    | 'isLoadingAdditionalInfo'
    | 'descriptionInspiration'
    | 'description'
    | 'type'
  >
  isEditing: boolean
  onImagesAdd: () => void
  onChange: (name: string, value: OfferPreviewType) => void
}

const Images = ({ item, isEditing, onImagesAdd, onChange }: Props) => (
  <TitleWithContent>
    <H5 data-test={'item-images-header'}>Images</H5>
    <Suspense fallback={<Skeleton height="294px" />}>
      <ImageUploader
        id={item.id}
        isEditing={isEditing}
        onImagesUpdate={onChange}
        onImagesAdd={onImagesAdd}
        allImages={item.allImages}
        visibleImages={item.visibleImages}
      />
    </Suspense>
  </TitleWithContent>
)
export default Images
