// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

/**
 * Custom command 'setSelectOption'.
 * Selects an option in a 'react-select' component
 */
Cypress.Commands.add(
  'setSelectOption',
  {
    prevSubject: true
  },
  (element, option, wait = 0) => {
    cy.wrap(element)
      .find('input:text')
      .focus()
      .type(option, { force: true })
      .wait(wait)
      .type('{enter}', { force: true })
  }
)

/**
 * Custom command 'clearSelectOption'.
 * Selects an option in a 'react-select' component
 */
Cypress.Commands.add(
  'clearSelectOption',
  {
    prevSubject: true
  },
  (element, option, wait = 0) => {
    cy.wrap(element).find('input:text').focus().type('{selectall}{backspace}', { force: true })
  }
)

/**
 * Custom command 'getSelectOption'.
 * Return the selected option in a 'react-select' component
 */
Cypress.Commands.add(
  'getSelectOption',
  {
    prevSubject: true
  },
  (element) => {
    cy.wrap(element).find('[class*=singleValue]').invoke('text')
  }
)

Cypress.Commands.add('getByName', (name) => cy.get(`[name='${name}']`))
