import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Profile from 'pages/Profile'
import NavBar from 'components/NavBar'
import PrivateRoute from 'components/PrivateRoute'
import Home from 'pages/Home'

function App() {
  return (
    <div className="App">
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
