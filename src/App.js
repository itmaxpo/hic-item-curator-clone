import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Profile from 'pages/Profile'
import NavBar from 'components/NavBar'
import PrivateRoute from 'components/PrivateRoute'
import Home from 'pages/Home'

/**
 * This is the entry App component to generate the app
 *
 * @name App1
 * @kind function
 * @returns {Object} The whole App
 * @category App
 */
function App() {
  return (
    <div className="App">
      {/* New - use BrowserRouter to provide access to /profile */}
      <BrowserRouter>
        <header>
          <NavBar />
        </header>
        <Switch>
          <PrivateRoute path="/profile" component={Profile} />
          <Route path="*" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
