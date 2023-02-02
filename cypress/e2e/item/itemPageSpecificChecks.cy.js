/* global cy before */
describe('Specific checks: description inspirations', () => {
  before(() => cy.itemPageCountrySpecificLoad())

  it('could edit country  item', () => {
    cy.get('[data-test=edit-item-button]').click({ force: true })
    cy.get('[data-test=inspiration-collapse-button]').click({ force: true })
    cy.get('[data-test=item-inspiration-wetu]').find('span').contains('Displayed')
    cy.get('[data-test=item-description-editor]').click()
    cy.get('[data-test=item-inspiration-wetu]')
      .find('span')
      .contains('Displayed')
      .should('not.exist')
    cy.get('[data-test=cancel-item-button]').click({ force: true })
  })
})
