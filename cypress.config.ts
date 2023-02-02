import { defineConfig } from 'cypress'

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000/',
    viewportWidth: 1440,
    viewportHeight: 747,
    video: false,
    experimentalFetchPolyfill: true,
    retries: 1,
    pageLoadTimeout: 10000
  }
})
