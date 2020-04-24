/* global describe, it, cy, before */

describe('Item Page - Area', () => {
  it('area loads', () => {
    cy.getFetchPolyfill().as('fetchPolyfill')
    cy.get('@fetchPolyfill').itemPageAreaLoad()
    cy.get('h2').contains('Some example oof Area')
    cy.wait(4000)

    // check area item layout
    // Checking for language switcher
    cy.get('[data-test=item-language-switcher]').should('have.length', 1)
    // Check description
    cy.get('[data-test=item-description-header]').contains('Description')
    cy.get('[data-test=item-description-wrapper]').contains('Some description')
    // Check images
    cy.get('[data-test=item-images-header]').contains('Images')
    cy.get('[data-id=0]').contains('Cover image')
    cy.get('[data-id=1]')
    cy.get('[data-id=2]').should('not.exist')

    // Check location
    cy.get('[data-test=item-location-header]').contains('Location')

    // Check editing item page
    cy.get('[data-test=edit-item-button]').click()
    cy.get('[data-test=item-title-input]').type('2')
    cy.get('[data-test=item-description-editor]')
      .find('[contenteditable="true"]')
      .type(' again')
    cy.get('[data-test=save-item-button]').click()

    // Check edited item
    cy.get('h2').contains('Some example oof Area2')
    cy.get('[data-test=item-description-wrapper]').contains('Some description again')
  })
})
