/* global Cypress cy */
/**
 * Custom command 'homePageStub'.
 * Stubs the relevant APIs for the home page.
 */
Cypress.Commands.add('homePageStub', () => {
  // stub API
  cy.intercept('POST', 'https://**.eu.auth0.com/oauth/token', { fixture: 'token.json' })
  cy.intercept('GET', 'https://partners-staging.**.com/configurations/v2/suppliers.json', {
    fixture: 'suppliers.json'
  })

  cy.intercept(
    'GET',
    'https://partners-staging.**.com/content/items?item_type=accommodation_category&offset=0',
    {
      fixture: 'item/accommodation-category.json'
    }
  )
  cy.intercept('GET', 'https://partners-staging.**.com/content/items/**', {
    fixture: 'item/item.json'
  })
  cy.intercept('GET', 'https://partners-staging.**.com/content/**/attachments*', {
    fixture: 'item/attachments.json'
  })
})

/**
 * Custom command 'homePageLoad'.
 * Loads Home page, and stubs the relevant APIs.
 */
Cypress.Commands.add('homePageLoad', () => {
  cy.homePageStub()
  cy.visit('/')
})
