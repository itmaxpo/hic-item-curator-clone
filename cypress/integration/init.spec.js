describe('Cypress', () => {
  it('is working', () => {
    cy.visit('/')
    cy.get('a').contains('Go to ... here actually')
  })
})
