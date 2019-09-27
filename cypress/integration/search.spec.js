describe('Search', () => {
  it('is working', () => {
    cy.visit('/')
    cy.get('h3').contains('What item are you looking for?')
  })
})
