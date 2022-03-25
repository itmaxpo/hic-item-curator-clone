import { Hr, Box } from '@tourlane/tourlane-ui'

import { TextAreaWithHeader } from 'components/RichTextEditor/TextAreaWithHeader'
import { FIELD_OFFER_PREVIEW } from '../../itemParser'

export interface OfferPreviewType {
  title: string
  heading: string
  lead: string
  introduction: string
  dataTest: string
}

interface Props {
  offerPreview: OfferPreviewType
  isEditing: boolean
  onChange: (name: 'offer_preview', value: OfferPreviewType) => void
}

const Intro = ({ offerPreview, isEditing, onChange }: Props) => {
  const onIntroChange = (key: string, value: string) =>
    onChange(FIELD_OFFER_PREVIEW, { ...offerPreview, [key]: value })

  return (
    <>
      <TextAreaWithHeader
        dataTest="item-title-editor"
        title="Offer title"
        field={offerPreview?.title ?? ''}
        fieldName="title"
        emptyItemText="No Offer Title"
        placeholder="Please add an offer title"
        onChange={onIntroChange}
        isEditing={isEditing}
        rows={2}
        maxLength={60}
      />

      <Box as={Hr} mt={40} />

      <Box mt={40}>
        <TextAreaWithHeader
          dataTest="item-heading-editor"
          title="Trip introduction"
          field={offerPreview?.heading ?? ''}
          subtitle="Headline"
          fieldName="heading"
          onChange={onIntroChange}
          isEditing={isEditing}
          rows={2}
          maxLength={55}
        />
      </Box>

      <Box mt={40}>
        <TextAreaWithHeader
          dataTest="item-lead-editor"
          field={offerPreview?.lead ?? ''}
          subtitle="Subheading"
          fieldName="lead"
          onChange={onIntroChange}
          isEditing={isEditing}
          rows={3}
          maxLength={235}
        />
      </Box>

      <Box mt={40}>
        <TextAreaWithHeader
          dataTest="item-introduction-editor"
          field={offerPreview?.introduction ?? ''}
          subtitle="Body Copy"
          placeholder="Please add body copy"
          fieldName="introduction"
          onChange={onIntroChange}
          isEditing={isEditing}
          rows={4}
          maxLength={310}
        />
      </Box>
    </>
  )
}
export default Intro
