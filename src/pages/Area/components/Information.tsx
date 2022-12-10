import { H5, AccordionGroup, Accordion, Box, Base } from '@tourlane/tourlane-ui'
import { isEmpty } from 'lodash'
import parse from 'html-react-parser'
import { HFRichTextEditorConfigured } from 'components/hook-form'
import { itemSpecificFields } from '../../Item/itemParser'
import { capitalize } from 'pages/Search/utils'
import { AreaType } from '../areaApi'

interface Props {
  item: AreaType
  isEditing: boolean
  type: string
}

const Information = ({ item, isEditing, type }: Props) => {
  // @ts-ignore
  const parsedDescriptions = (itemSpecificFields[type] as string[]).sort().map((field) => ({
    label: capitalize(field.split('_').join(' ')),
    field: field,
    // @ts-ignore
    value: !isEmpty(item[field]) && item[field]
  }))
  // @ts-ignore
  const preExpanded = (itemSpecificFields[type] as string[]).sort().map((field) => field)

  return (
    <>
      <Box px={60} mb={40}>
        <H5 data-test="item-information-header">Information</H5>
      </Box>

      <AccordionGroup preExpanded={preExpanded}>
        {parsedDescriptions.map((d, i) => (
          <Accordion
            data-test={`item-information-${d.field}`}
            key={i}
            name={d.field}
            contentProps={{ style: { paddingLeft: 30 } }}
            title={(<div style={{ paddingLeft: 30 }}>{d.label}</div>) as any}
          >
            {isEditing ? (
              <HFRichTextEditorConfigured
                data-test={`item-information-${d.field}-editor`}
                name={d.label}
              />
            ) : (
              <Base>{parse(d.value || 'No information found')}</Base>
            )}
          </Accordion>
        ))}
      </AccordionGroup>
    </>
  )
}
export default Information
