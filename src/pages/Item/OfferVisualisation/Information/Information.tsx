import { Suspense } from 'react'
import { H5, AccordionGroup, Accordion, Box, Big } from '@tourlane/tourlane-ui'
import { isEmpty } from 'lodash'
import parse from 'html-react-parser'

import StyledRichTextEditor from 'components/RichTextEditor'
import { RichTextEditorLoader } from '../Description/styles'
import { itemSpecificFields } from '../../itemParser'
import { capitalize } from 'pages/Search/utils'
import { PageProps } from 'types/PageProps'

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
  onChange: (name: string, value: string) => void
  type: string
}

const Information = ({ item, isEditing, onChange, type }: Props) => {
  // @ts-ignore
  const parsedDescriptions = (itemSpecificFields[type] as string[])
    .filter((f) => f !== 'active_destination')
    .sort()
    .map((field) => ({
      label: capitalize(field.split('_').join(' ')),
      field: field,
      // @ts-ignore
      value: !isEmpty(item[field]) && item[field]
    }))

  return (
    <>
      <Box px={60}>
        <H5 data-test="item-information-header">Information</H5>
      </Box>

      <AccordionGroup>
        {parsedDescriptions.map((d, i) => (
          <Accordion
            data-test={`item-information-${d.field}`}
            key={i}
            name={d.field}
            contentProps={{ style: { paddingLeft: 30 } }}
            title={(<div style={{ paddingLeft: 30 }}>{d.label}</div>) as any}
          >
            {isEditing ? (
              <Suspense fallback={<RichTextEditorLoader />}>
                <StyledRichTextEditor
                  data-test={`item-information-${d.field}-editor`}
                  placeholder={`Please write something about the ${d.label.toLowerCase()}`}
                  value={d.value}
                  onChange={(val: string) => onChange(d.field, val)}
                />
              </Suspense>
            ) : (
              <Big>{parse(d.value || 'No information found')}</Big>
            )}
          </Accordion>
        ))}
      </AccordionGroup>
    </>
  )
}
export default Information
