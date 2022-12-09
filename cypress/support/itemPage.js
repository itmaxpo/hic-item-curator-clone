/* global Cypress cy */
/**
 * Custom command 'itemPageAccommodationStub'.
 * Stubs the relevant APIs for the home page.
 */
Cypress.Commands.add('itemPageAccommodationStub', (type = 'accom') => {
  // stub API
  cy.server()
  cy.route('POST', 'https://**.eu.auth0.com/oauth/token', 'fixture:token.json')
  cy.route(
    'GET',
    'https://partners-staging.**.com/configurations/v2/suppliers.json',
    'fixture:suppliers.json'
  )
  cy.route('GET', 'https://partners-staging.**.com/content/items/**', 'fixture:item/item.json')
  cy.route(
    'GET',
    'https://partners-staging.**.com/content/items?item_type=accommodation_category&offset=0',
    'fixture:item/accommodation-category.json'
  )

  cy.route(
    'GET',
    'https://partners-staging.**.com/content/**/attachments?limit=50&offset=0',
    'fixture:item/attachments.json'
  )
  cy.route(
    'PATCH',
    'https://partners-staging.**.com/content/**/attachments/**',
    'fixture:item/attachments.json'
  )
  cy.route(
    'POST',
    'https://partners-staging.tlservers.com/content/countries/search',
    'fixture:item/textCountry.json'
  )
  cy.route(
    'POST',
    'https://partners-staging.**.com/content/areas/search',
    'fixture:item/testArea.json'
  )
  cy.route(
    'POST',
    'https://partners-staging.**.com/search/v1/items?test-accommodation',
    'fixture:item/testAccommodation.json'
  )
  cy.route(
    'POST',
    'https://partners-staging.**.com/search/v1/items?test-room',
    'fixture:item/testRoom.json'
  )
})

/**
 * Custom command 'itemPageAccoommodationLoad'.
 * Loads Home page, and stubs the relevant APIs.
 */
Cypress.Commands.add('itemPageAccommodationLoad', () => {
  cy.itemPageAccommodationStub()
  cy.visit('/item/f09e3867-e082-4eb0-a6ff-fc96d63e977a?language=en-GB')
})

/**
 * Custom command 'itemPageAreaStub'.
 * Stubs the relevant APIs for the home page.
 */
Cypress.Commands.add('itemPageAreaStub', (type = 'accom') => {
  // stub API
  cy.server()
  cy.route('POST', 'https://**.eu.auth0.com/oauth/token', 'fixture:token.json')
  cy.route('GET', 'https://partners-staging.**.com/content/suppliers?**', 'fixture:suppliers.json')
  cy.route('GET', 'https://partners-staging.**.com/content/items/**', 'fixture:item/testArea.json')
  cy.route(
    'GET',
    'https://partners-staging.**.com/content/items?item_type=accommodation_category&offset=0',
    'fixture:item/accommodation-category.json'
  )

  cy.route(
    'PATCH',
    'https://partners-staging.**.com/content/items/**',
    'fixture:item/updatedArea.json'
  )

  cy.route(
    'GET',
    'https://partners-staging.**.com/content/**/attachments?limit=50&offset=0',
    'fixture:item/attachments.json'
  )
  cy.route(
    'PATCH',
    'https://partners-staging.**.com/content/**/attachments/**',
    'fixture:item/attachments.json'
  )
  cy.route(
    'POST',
    'https://partners-staging.tlservers.com/content/countries/search',
    'fixture:item/textCountry.json'
  )
  cy.route(
    'POST',
    'https://partners-staging.**.com/content/areas/search',
    'fixture:item/testArea.json'
  )
  cy.route(
    'POST',
    'https://partners-staging.**.com/search/v1/items?test-accommodation',
    'fixture:item/testAccommodation.json'
  )
  cy.route(
    'POST',
    'https://partners-staging.**.com/search/v1/items?test-room',
    'fixture:item/testRoom.json'
  )
})

/**
 * Custom command 'itemPageAreaLoad'.
 * Loads Home page, and stubs the relevant APIs.
 */
Cypress.Commands.add('itemPageAreaLoad', () => {
  cy.itemPageAreaStub()

  cy.visit('/item/f09e3867-e082-4eb0-a6ff-fc96d63e977a?language=en-GB')
})

/**
 * Custom command 'itemPageAreaStub'.
 * Stubs the relevant APIs for the home page.
 */
Cypress.Commands.add('itemPageCountryStub', (type = 'accom') => {
  // stub API
  cy.server()
  cy.route('POST', 'https://**.eu.auth0.com/oauth/token', 'fixture:token.json')
  cy.route('GET', 'https://partners-staging.**.com/content/suppliers?**', 'fixture:suppliers.json')
  cy.route(
    'GET',
    'https://partners-staging.**.com/content/items/**',
    'fixture:item/testCountry.json'
  )
  cy.route(
    'GET',
    'https://partners-staging.**.com/content/items/**/polygon',
    'fixture:item/polygon.json'
  )
  cy.route(
    'GET',
    'https://partners-staging.**.com/content/items?item_type=accommodation_category&offset=0',
    'fixture:item/accommodation-category.json'
  )
  cy.route(
    'GET',
    'https://partners-staging.**.com/content/**/attachments?limit=50&offset=0',
    'fixture:item/attachments.json'
  )
  cy.route(
    'PATCH',
    'https://partners-staging.**.com/content/**/attachments/**',
    'fixture:item/attachments.json'
  )
  cy.route(
    'POST',
    'https://partners-staging.tlservers.com/content/countries/search',
    'fixture:item/textCountry.json'
  )
  cy.route(
    'POST',
    'https://partners-staging.**.com/content/areas/search',
    'fixture:item/testArea.json'
  )
  cy.route(
    'POST',
    'https://partners-staging.**.com/search/v1/items?test-accommodation',
    'fixture:item/testAccommodation.json'
  )
  cy.route(
    'POST',
    'https://partners-staging.**.com/search/v1/items?test-room',
    'fixture:item/testRoom.json'
  )
})

/**
 * Custom command 'itemPageCountryLoad'.
 * Loads Home page, and stubs the relevant APIs.
 */
Cypress.Commands.add('itemPageCountryLoad', () => {
  cy.itemPageCountryStub()
  cy.visit('/item/f09e3867-e082-4eb0-a6ff-fc96d63e977a?language=en-GB')
})
