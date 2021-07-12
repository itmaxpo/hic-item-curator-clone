/**
 * Custom command 'fileUploadSuccessStub'.
 * Stubs file upload API with a successful response.
 */
Cypress.Commands.add('fileUploadSuccessStub', (fixture = 'test.jpg') => {
  const fixturePath = `fixture:item/${fixture}`

  // stub API
  cy.server()
  cy.route('POST', 'https://partners-staging.**.com/content/**/attachments', fixturePath)
})

/**
 * Custom command 'fileUploadErrorStub'.
 * Stubs file upload API with an error response.
 */
Cypress.Commands.add('fileUploadErrorStub', () => {
  // stub API
  cy.server()
  cy.route({
    method: 'POST',
    url: 'https://partners-staging.**.com/content/**/attachments',
    status: 422,
    response: {}
  })
})
