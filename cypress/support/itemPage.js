/**
 * Custom command 'itemPageAccommodationStub'.
 * Stubs the relevant APIs for the home page.
 */
Cypress.Commands.add('itemPageAccommodationStub', (type = 'accom') => {
  // stub API
  cy.server()
  cy.route('POST', 'https://**.eu.auth0.com/oauth/token', 'fixture:token.json')
  cy.route('GET', 'https://kiwi.**.com/configurations/suppliers.json', 'fixture:suppliers.json')
  cy.route('GET', 'https://kiwi.**.com/content/items/**', 'fixture:item/item.json')

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
 * Custom command 'itemPageAccoommodationLoad'.
 * Loads Home page, polyfills 'fetch', and stubs the relevant APIs.
 */
Cypress.Commands.add(
  'itemPageAccommodationLoad',
  {
    prevSubject: true
  },
  fetchPolyfill => {
    cy.itemPageAccommodationStub()
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

/**
 * Custom command 'itemPageAreaStub'.
 * Stubs the relevant APIs for the home page.
 */
Cypress.Commands.add('itemPageAreaStub', (type = 'accom') => {
  // stub API
  cy.server()
  cy.route('POST', 'https://**.eu.auth0.com/oauth/token', 'fixture:token.json')
  cy.route('GET', 'https://kiwi.**.com/content/suppliers?**', 'fixture:suppliers.json')
  cy.route('GET', 'https://kiwi.**.com/content/items/**', 'fixture:item/testArea.json')

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
 * Custom command 'itemPageAreaLoad'.
 * Loads Home page, polyfills 'fetch', and stubs the relevant APIs.
 */
Cypress.Commands.add(
  'itemPageAreaLoad',
  {
    prevSubject: true
  },
  fetchPolyfill => {
    cy.itemPageAreaStub()
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

/**
 * Custom command 'itemPageAreaStub'.
 * Stubs the relevant APIs for the home page.
 */
Cypress.Commands.add('itemPageCountryStub', (type = 'accom') => {
  // stub API
  cy.server()
  cy.route('POST', 'https://**.eu.auth0.com/oauth/token', 'fixture:token.json')
  cy.route('GET', 'https://kiwi.**.com/content/suppliers?**', 'fixture:suppliers.json')
  cy.route('GET', 'https://kiwi.**.com/content/items/**', 'fixture:item/testCountry.json')
  cy.route('GET', 'https://kiwi.**.com/content/items/**/polygon', 'fixture:item/polygon.json')

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
 * Custom command 'itemPageCountryLoad'.
 * Loads Home page, polyfills 'fetch', and stubs the relevant APIs.
 */
Cypress.Commands.add(
  'itemPageCountryLoad',
  {
    prevSubject: true
  },
  fetchPolyfill => {
    cy.itemPageCountryStub()
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
