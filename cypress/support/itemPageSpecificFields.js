/**
 * Custom command 'itemPageAreaCountryStub'.
 * Stubs the relevant APIs for the home page.
 */
Cypress.Commands.add('itemPageAreaCountryStub', (type = 'accom') => {
  // stub API
  cy.intercept('POST', 'https://**.eu.auth0.com/oauth/token', { fixture: 'token.json' })

  cy.intercept('GET', 'https://partners-staging.**.com/configurations/v2/suppliers.json', {
    fixture: 'suppliers.json'
  })

  cy.intercept('GET', 'https://partners-staging.**.com/content/items/**', {
    fixture: 'item/testCountry.json'
  })
  cy.intercept('GET', 'https://partners-staging.**.com/content/items/**/polygon', {
    fixture: 'item/polygon.json'
  })

  cy.intercept(
    'GET',
    'https://partners-staging.**.com/content/items?item_type=accommodation_category&offset=0',
    {
      fixture: 'item/accommodation-category.json'
    }
  )
  cy.intercept('GET', 'https://partners-staging.**.com/content/**/attachments?limit=50&offset=0', {
    fixture: 'item/attachments.json'
  })

  cy.intercept('PATCH', 'https://partners-staging.**.com/content/**/attachments/**', {
    fixture: 'item/attachments.json'
  })

  cy.intercept('POST', 'https://partners-staging.tlservers.com/content/countries/search', {
    fixture: 'item/testCountry.json'
  })

  cy.intercept('POST', 'https://partners-staging.**.com/content/areas/search', {
    fixture: 'item/testArea.json'
  })

  cy.intercept('POST', 'https://partners-staging.**.com/search/v1/items?test-accommodation', {
    fixture: 'item/testAccommodation.json'
  })

  cy.intercept('POST', 'https://partners-staging.**.com/search/v1/items?test-room', {
    fixture: 'item/testRoom.json'
  })
})

/**
 * Custom command 'itemPageCountrySpecificLoad'.
 * Loads Home page, and stubs the relevant APIs.
 */
Cypress.Commands.add('itemPageCountrySpecificLoad', () => {
  cy.itemPageAreaCountryStub()
  cy.visit('/item/f09e3867-e082-4eb0-a6ff-fc96d63e977a?language=en-GB')
})
