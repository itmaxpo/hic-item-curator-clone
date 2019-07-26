describe('Login', () => {
  it('is working', () => {
    cy.visit('/')
    cy.get('p').contains('Seamless and smooth item management')
  })
})
