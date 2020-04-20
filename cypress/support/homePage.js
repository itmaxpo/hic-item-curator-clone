/* global Cypress cy */
/**
 * Custom command 'homePageStub'.
 * Stubs the relevant APIs for the home page.
 */
Cypress.Commands.add('homePageStub', () => {
  // stub API
  cy.server()
  cy.route('POST', 'https://**.eu.auth0.com/oauth/token', 'fixture:token.json')
  cy.route('GET', 'https://kiwi.**.com/configurations/suppliers.json', 'fixture:suppliers.json')
  cy.route('POST', 'https://kiwi.**.com/content/items', 'fixture:create/create-response.json')
  cy.route(
    'GET',
    'https://kiwi.**.com/content/items?item_type=accommodation_category&offset=0',
    'fixture:item/accommodation-category.json'
  )
  cy.route('GET', 'https://kiwi.**.com/content/items/**', 'fixture:item/item.json')
  cy.route('GET', 'https://kiwi.**.com/content/**/attachments', 'fixture:item/attachments.json')
})

/**
 * Custom command 'homePageLoad'.
 * Loads Home page, polyfills 'fetch', and stubs the relevant APIs.
 */
Cypress.Commands.add(
  'homePageLoad',
  {
    prevSubject: true
  },
  fetchPolyfill => {
    cy.homePageStub()
    cy.visit('/', {
      onBeforeLoad(win) {
        // replace win.fetch with polyfill, so that Cypress can stub XHR requests
        delete win.fetch
        win.eval(fetchPolyfill)
        win.fetch = win.unfetch
      }
    })
  }
)
