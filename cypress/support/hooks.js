// https://dev.to/victormagarlamov/testing-a-request-with-cypress-17oc

enableFetchWorkaround()

function enableFetchWorkaround() {
  let polyfill

  before(() => {
    cy.request('https://unpkg.com/unfetch/dist/unfetch.umd.js').then(response => {
      polyfill = response.body
      return polyfill
    })
  })

  Cypress.on('window:before:load', win => {
    // replace win.fetch with polyfill, so that Cypress can stub XHR requests
    delete win.fetch
    win.eval(polyfill)
    win.fetch = win.unfetch
  })
}
