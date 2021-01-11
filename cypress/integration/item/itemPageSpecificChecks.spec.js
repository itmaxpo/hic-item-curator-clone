/* global cy before */
describe('Specific checks: image upload & description inspirations', () => {
  before(() => {
    cy.itemPageCountrySpecificLoad()
    cy.get('h2').contains('South Africa')
    cy.wait(4000)
  })

  it('country edit item', () => {
    // EDIT ITEM
    cy.get('[data-test=edit-item-button]').click()
    cy.get('[data-test=inspiration-collapse-button]').click({ force: true })
    cy.get('[data-test=item-inspiration-wetu]')
      .find('span')
      .contains('Displayed')
    cy.get('[data-test=item-description-editor]').click()
    cy.get('[data-test=item-inspiration-wetu]')
      .find('span')
      .contains('Displayed')
      .should('not.exist')
  })

  it('country check image uploader', () => {
    cy.get('[data-test=select-image-source]').setSelectOption('WETU')
    cy.get('button').contains('Browse files')
    cy.get('#image-library')
      .find('[data-id]')
      .should('have.length', 1)
    cy.get('#visible-images')
      .find('[data-id]')
      .should('have.length', 2)

    cy.get('#visible-images').find('[data-id=1]')
  })

  it('country image upload', () => {
    cy.server()
    cy.route(
      'POST',
      'https://kiwi.tlservers.com/content/items/c44b8127-1529-4df0-ad52-bc084f5df7ee/presigned_posts',
      'fixture:item/presigned.json'
    )
    cy.route('POST', 'https://kiwi.**.com/content/**/attachments', 'fixture:item/createImage.json')

    cy.get('[data-test=select-image-source]').setSelectOption('WETU')
    // using the browse files input to upload a file
    cy.fixture('item/test.jpg', 'base64').then(fileContent => {
      cy.get('.FileInput').upload(
        { fileContent, fileName: 'test.jpg', mimeType: 'image/jpg' },
        { subjectType: 'input' }
      )
    })

    cy.get('#image-library')
      .find('.loader')
      .should('have.length', 1)
    cy.get('#image-library')
      .find('[data-id]')
      .should('have.length', 2)
    cy.get('[data-test=save-item-button]').click()
  })
})
