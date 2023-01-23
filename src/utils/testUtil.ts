import { fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createEvent } from '@testing-library/dom'
import { ACCORDION_ITEMS } from 'pages/Country/__mocks__/country'

export function createPasteEvent(html: string) {
  const text = html.replace('<[^>]*>', '')
  return {
    clipboardData: {
      types: ['text/plain', 'text/html'],
      getData: (type: 'text/plain' | 'text/html') => (type === 'text/plain' ? text : html)
    }
  }
}

export const convertFieldNameToText = (name: string) => `new ${name.replaceAll('_', ' ')}`

export const updateFormValues = async (container: HTMLElement, type: 'area' | 'country') => {
  const editButton = await screen.findByRole('button', { name: 'Edit Content' })
  await userEvent.click(editButton)

  const nameInput: HTMLInputElement = await screen.findByTestId(`${type}_name`)
  await userEvent.clear(nameInput)
  await userEvent.type(nameInput, 'new name')

  const activeDestination = await screen.findByTestId('active_destination')
  fireEvent.click(activeDestination)

  const textareaTestIdsList = [
    'offer_preview_title',
    'offer_preview_heading',
    'offer_preview_lead',
    'offer_preview_lead',
    'offer_preview_introduction'
  ]

  for (const testId of textareaTestIdsList) {
    const offerPreviewTitle = await screen.findByTestId(testId)
    fireEvent.change(offerPreviewTitle, { target: { value: convertFieldNameToText(testId) } })
  }

  Object.keys(ACCORDION_ITEMS).forEach((item) => {
    const itemContainer = container.querySelector(
      `[data-test="${item}"] .public-DraftEditor-content`
    ) as any

    const descriptionPasteEvent = createEvent.paste(
      itemContainer,
      createPasteEvent(convertFieldNameToText(item))
    ) as any

    fireEvent(itemContainer, descriptionPasteEvent)
  })

  if (type === 'area') {
    fireEvent.click(await screen.findByTestId('visualization_destination'))
  }

  const saveButton = await screen.findByTestId(`update-${type}`)
  await userEvent.click(saveButton)
}
