import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { init } from '@sentry/browser'
// Setup Sentry Error tracking
if (process.env.REACT_APP_DEPLOYED_TO === 'production') {
  init({ dsn: 'https://eab8e1b80d9e484b97466e71a7d4c15c@sentry.io/1511575' })
}

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
