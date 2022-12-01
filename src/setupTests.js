import 'jest-styled-components'
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

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

Object.defineProperty(window, 'confirm', {
  writable: true,
  value: jest.fn().mockReturnValue(true),
})

