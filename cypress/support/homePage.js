/* global Cypress cy */
/**
 * Custom command 'homePageStub'.
 * Stubs the relevant APIs for the home page.
 */
Cypress.Commands.add('homePageStub', () => {
  // stub API
  cy.server()
  cy.route('POST', 'https://**.eu.auth0.com/oauth/token', 'fixture:token.json')
  cy.route(
    'GET',
    'https://partners-staging.**.com/configurations/v2/suppliers.json',
    'fixture:suppliers.json'
  )
  cy.route(
    'POST',
    'https://partners-staging.**.com/content/items',
    'fixture:create/create-response.json'
  )
  cy.route(
    'GET',
    'https://partners-staging.**.com/content/items?item_type=accommodation_category&offset=0',
    'fixture:item/accommodation-category.json'
  )
  cy.route('GET', 'https://partners-staging.**.com/content/items/**', 'fixture:item/item.json')
  cy.route(
    'GET',
    'https://partners-staging.**.com/content/**/attachments*',
    'fixture:item/attachments.json'
  )

  cy.route(
      'GET',
      'https://partners-staging.**.com/configurations/v2/suppliers.json',
      'fixture:suppliers.json'
  )
})

/**
 * Custom command 'homePageLoad'.
 * Loads Home page, and stubs the relevant APIs.
 */
Cypress.Commands.add('homePageLoad', () => {
  cy.homePageStub()
  cy.visit('/')
})
