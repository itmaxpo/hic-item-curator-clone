// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

/* global Cypress cy */

import 'cypress-file-upload'
import './commands'
import './upload'
import './homePage'
import './itemPage'
import './itemPageSpecificFields'
import './activity'

Cypress.on('uncaught:exception', (err, runnable) => {
  // We can ignore this error - https://stackoverflow.com/a/50387233/2564302
  if (err.message.includes('ResizeObserver loop limit exceeded')) {
    return false
  }
})
