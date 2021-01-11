/* global describe, it, cy, before */

describe('GIVEN an Activity page', () => {
  before(() => {
    cy.activityLoad()
  })

  it('THEN it should have the activity name', () => {
    cy.get('h2').contains('My Activity')
  })

  it('THEN it should have the edit content button', () => {
    cy.get('[data-test="edit-content"]').contains('Edit Content')
  })

  it('THEN it should have the language selector', () => {
    cy.get('[data-test="item-language-switcher"]').should('exist')
  })

  it('THEN it should have all the activity data filled properly', () => {
    cy.get('[data-test="display-name"]').should('have.value', 'English Name')
    cy.get('[data-test="themes"]').contains('Beach')
    cy.get('[data-test="description"]').should(
      'have.value',
      'This is to test the description in English language this is amazing'
    )
    cy.get('[data-test="inclusions"]').should('have.value', 'Inclusions')
    cy.get('[data-test="exclusions"]').should('have.value', 'Exclusions')
    cy.get('[data-test="what-to-bring"]').should('have.value', 'What to bring')

    cy.get('[data-test="height-restrictions"]').should('be', 'checked')
    cy.get('[data-test="Min"]').should('have.value', '1.5')
    cy.get('[data-test="Max"]').should('have.value', '3')
  })
})
