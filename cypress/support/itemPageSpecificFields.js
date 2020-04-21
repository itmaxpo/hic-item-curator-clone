/**
 * Custom command 'itemPageAreaCountryStub'.
 * Stubs the relevant APIs for the home page.
 */
Cypress.Commands.add('itemPageAreaCountryStub', (type = 'accom') => {
  // stub API
  cy.server()
  cy.route('POST', 'https://**.eu.auth0.com/oauth/token', 'fixture:token.json')
  cy.route('GET', 'https://kiwi.**.com/content/suppliers?**', 'fixture:suppliers.json')
  cy.route('GET', 'https://kiwi.**.com/content/items/**', 'fixture:item/testCountry.json')
  cy.route('GET', 'https://kiwi.**.com/content/items/**/polygon', 'fixture:item/polygon.json')
  cy.route(
    'GET',
    'https://kiwi.**.com/content/items?item_type=accommodation_category&offset=0',
    'fixture:item/accommodation-category.json'
  )
  cy.route(
    'GET',
    'https://kiwi.**.com/content/**/attachments?limit=50&offset=0',
    'fixture:item/attachments.json'
  )
  cy.route(
    'PATCH',
    'https://kiwi.**.com/content/**/attachments/**',
    'fixture:item/attachments.json'
  )
  cy.route(
    'POST',
    'https://kiwi.**.com/search/v1/items?test-country',
    'fixture:item/textCountry.json'
  )
  cy.route('POST', 'https://kiwi.**.com/search/v1/items?test-area', 'fixture:item/testArea.json')
  cy.route(
    'POST',
    'https://kiwi.**.com/search/v1/items?test-accommodation',
    'fixture:item/testAccommodation.json'
  )
  cy.route('POST', 'https://kiwi.**.com/search/v1/items?test-room', 'fixture:item/testRoom.json')
})

/**
 * Custom command 'itemPageCountrySpecificLoad'.
 * Loads Home page, polyfills 'fetch', and stubs the relevant APIs.
 */
Cypress.Commands.add(
  'itemPageCountrySpecificLoad',
  {
    prevSubject: true
  },
  fetchPolyfill => {
    cy.itemPageAreaCountryStub()
    cy.visit('/item/f09e3867-e082-4eb0-a6ff-fc96d63e977a?language=en-GB', {
      onBeforeLoad(win) {
        // replace win.fetch with polyfill, so that Cypress can stub XHR requests
        delete win.fetch
        win.eval(fetchPolyfill)
        win.fetch = win.unfetch
      }
    })
  }
)
