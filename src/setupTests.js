import '@testing-library/jest-dom'

// Increase timeout from 5 to 30 seconds to handle some slow tests.
jest.setTimeout(30_000)

let warn = console.warn
console.warn = (...args) => {
  // ignore "React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead."
  if (typeof args[0] !== 'string' || !args[0].includes('React.createFactory()')) {
    warn(...args)
  }
}

let error = console.error
console.error = (...args) => {
  // ignore React warnings
  if (
    typeof args[0] !== 'string' ||
    !/(Warning: Received `%s`)|(React does not recognize)|(Invalid attribute name)/.test(args[0])
  ) {
    error(...args)
  }
}

window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(), // Deprecated
  removeListener: jest.fn(), // Deprecated
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn()
})

Object.defineProperty(window, 'confirm', {
  writable: true,
  value: jest.fn().mockReturnValue(true)
})
// Mock of innerText that is missing in js-dom
// Simplified version of https://github.com/jsdom/jsdom/issues/1245#issuecomment-470192636
Object.defineProperty(global.Element.prototype, 'innerText', {
  get() {
    return this.textContent
  },
  configurable: true // make it so that it doesn't blow chunks on re-running tests with things like --watch
})

window.crypto = { subtle: {} }
