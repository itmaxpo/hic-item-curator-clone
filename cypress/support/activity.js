/* global Cypress cy */
/**
 * Custom command 'activityStub'.
 * Stubs the relevant APIs for the home page.
 */
Cypress.Commands.add('activityStub', (type = 'accom') => {
  // stub API
  cy.server()
  cy.route('POST', 'https://**.eu.auth0.com/oauth/token', 'fixture:token.json')
  cy.route(
    'GET',
    'https://partners-staging.**.com/configurations/v2/suppliers.json',
    'fixture:suppliers.json'
  )
  cy.route(
    'GET',
    'https://partners-staging.**.com/content/activities/**',
    'fixture:activity/activity.json'
  )
  cy.route(
    'GET',
    'https://partners-staging.**.com/content/items?item_type=accommodation_category&offset=0',
    'fixture:item/accommodation-category.json'
  )
})

/**
 * Custom command 'ActivityLoad'.
 * Loads Home page, and stubs the relevant APIs.
 */
Cypress.Commands.add('activityLoad', () => {
  cy.activityStub()
  cy.visit('/activity/eb300912-821a-48e0-b3f0-411c53d6340a?language=en-GB')
})
