/* global describe, it, cy */

describe('Item Page - Area', () => {
  it('area loads', () => {
    cy.itemPageAreaLoad()
    cy.wait(4000)
    cy.get('h2').contains('Some example oof Area')

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
      .as('descriptionEditor')
      .contains('Some description')
      .click()
      .clear()
    cy.get('@descriptionEditor').type('Some description again')
    cy.get('[data-test=item-title-editor]').type('hello')
    cy.get('[data-test=item-heading-editor]').type('we are')
    cy.get('[data-test=item-lead-editor]').type('here')
    cy.get('[data-test=item-introduction-editor]').type('introduction goes here')

    cy.get('[data-test=save-item-button]').click()

    // Check edited item
    cy.get('h2').contains('Some example oof Area2')
    cy.get('[data-test=item-description-wrapper]').contains('Some description again')

    cy.get('[data-test=item-title-editor]').contains('hello')
    cy.get('[data-test=item-heading-editor]').contains('we are')
    cy.get('[data-test=item-lead-editor]').contains('here')
    cy.get('[data-test=item-introduction-editor]').contains('introduction goes here')

    cy.get('[data-test=source]').should('not.exist')
  })
})
