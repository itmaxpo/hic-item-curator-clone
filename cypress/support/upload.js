/**
 * Custom command 'fileUploadSuccessStub'.
 * Stubs file upload API with a successful response.
 */
Cypress.Commands.add('fileUploadSuccessStub', (fixture = 'test.jpg') => {
  const fixturePath = `item/${fixture}`

  // stub API
  cy.intercept('POST', 'https://partners-staging.**.com/content/**/attachments', {
    fixture: fixturePath
  })
})

/**
 * Custom command 'fileUploadErrorStub'.
 * Stubs file upload API with an error response.
 */
Cypress.Commands.add('fileUploadErrorStub', () => {
  // stub API
  cy.intercept('POST', 'https://partners-staging.**.com/content/**/attachments', {
    statusCode: 422,
    response: {}
  })
})
