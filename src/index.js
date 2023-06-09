import { createRoot } from 'react-dom/client'

import { App } from './App'
import * as serviceWorker from './serviceWorker'
import { init } from '@sentry/browser'
import './index.css'

// Extend navigator object with functionality to detect browser and version
navigator.browserSpecs = (function () {
  var ua = navigator.userAgent,
    tem,
    M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || []
    return { name: 'IE', version: tem[1] || '' }
  }
  if (M[1] === 'Chrome') {
    tem = ua.match(/\b(OPR|Edge)\/(\d+)/)
    if (tem != null) return { name: tem[1].replace('OPR', 'Opera'), version: tem[2] }
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?']
  if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1])
  return { name: M[0], version: M[1] }
})()

// Setup Sentry Error tracking
if (process.env.REACT_APP_DEPLOYED_TO === 'production') {
  init({ dsn: process.env.REACT_APP_SENTRY_DSN })
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
