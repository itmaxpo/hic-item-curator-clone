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
  it('THEN it should have the delete content button', () => {
    cy.get('[data-test="delete-content"]').contains('Delete').as('Delete')
    cy.get('@Delete').click()
    cy.get('[data-test="confirm-delete"]').contains('confirm')
  })

  it('THEN it should have all the activity data filled properly', () => {
    cy.getByName('display_name').should('have.value', 'English Name')
    cy.get('[data-test=themes]').contains('Beach')
    cy.get('[data-test=activity-form]')
      .find('[name=description]')
      .invoke('text')
      .should('eq', 'This is to test the description in English language this is amazing')
    cy.getByName('inclusions').invoke('text').should('eq', 'Inclusions')
    cy.getByName('exclusions').invoke('text').should('eq', 'Exclusions')
    cy.getByName('what_to_bring').invoke('text').should('eq', 'What to bring')

    cy.getByName('restrictions.height.restricted').should('be', 'checked')
    cy.getByName('restrictions.height.min').should('have.value', '1.5')
    cy.getByName('restrictions.height.max').should('have.value', '3')
  })
})
