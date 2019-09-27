/**
 * Custom command 'createItemPageStub'.
 * Stubs the relevant APIs for the create item page.
 */
Cypress.Commands.add('createItemPageStub', () => {
  // stub API
  cy.server()
  cy.route('POST', 'https://**.eu.auth0.com/oauth/token', 'fixture:token.json')
  cy.route('GET', 'https://kiwi.**.com/content/suppliers?**', 'fixture:suppliers.json')
  cy.route('GET', 'https://nominatim.openstreetmap.org/**', 'fixture:create/address.json')
  cy.route('POST', 'https://kiwi.**.com/content/items', 'fixture:create/create-response.json')
  cy.route('GET', 'https://kiwi.**.com/content/items/**', 'fixture:item/new-item.json')
  cy.route('POST', 'https://kiwi.**.com/search/v1/items', 'fixture:search/empty.json')
  cy.route('GET', 'https://kiwi.**.com/content/**/attachments', 'fixture:item/attachments.json')
})

/**
 * Custom command 'createItemPageLoad'.
 * Loads 'Create Item' page, polyfills 'fetch', and stubs the relevant APIs.
 */
Cypress.Commands.add(
  'createItemPageLoad',
  {
    prevSubject: true
  },
  fetchPolyfill => {
    cy.createItemPageStub()
    cy.visit('/create', {
      onBeforeLoad(win) {
        // replace win.fetch with polyfill, so that Cypress can stub XHR requests
        delete win.fetch
        win.eval(fetchPolyfill)
        win.fetch = win.unfetch
      }
    })
  }
)
