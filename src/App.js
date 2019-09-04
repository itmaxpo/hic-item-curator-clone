import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import MissingPage from 'pages/Missing'
import SearchPage from 'pages/Search'
import Login from 'pages/Login'
import Loading from 'pages/Loading'
import SandboxPage from 'pages/Sandbox'
import CreatePage from 'pages/Create'
import { useAuth0 } from 'contexts/Auth'
import ItemPage from 'pages/ItemPage'
import { COLORS } from '@tourlane/tourlane-ui'
import { SuppliersContextProvider } from './contexts/Suppliers'

const AppWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
`

/**
 * This is entry for the whole app
 * Will check if user isAuthenticated, if not - go to Login page
 * Also handle onScroll handler for the whole app
 *
 * @name App
 * @returns App
 */
function App() {
  const { isAuthenticated, loading } = useAuth0()

  // Used to handle animation of changes between sticky header and search actions
  // In all other cases header always sticky
  const handleScroll = () => {
    const header = document.getElementById('sticky-header')
    const stickyElement = document.getElementById('items-sticky-actions')
    // Header should be sticky until meets sticky Search Actions
    // TODO: fixed the styling when have query in URL handling
    if (stickyElement) {
      if (header.offsetTop >= 500) {
        header.style.visibility = 'hidden'
        stickyElement.style.top = '0'
        stickyElement.style.boxShadow = '0 1px 4px 0 rgba(63, 65, 68, 0.3)'
        stickyElement.style.backgroundColor = `${COLORS.SENSATION_WHITE}`
      } else {
        header.style.visibility = 'visible'
        stickyElement.style.top = '65px'
        stickyElement.style.boxShadow = '0 0 0 0 rgba(63, 65, 68, 0.3)'
        stickyElement.style.backgroundColor = 'transparent'
        // Needed for smooth animation between search actions and header
        if (header.offsetTop >= 450) {
          stickyElement.style.backgroundColor = `${COLORS.SENSATION_WHITE}`
          stickyElement.style.boxShadow = '0 1px 4px 0 rgba(63, 65, 68, 0.3)'
        }
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  }, [])

  if (loading) {
    return <Loading />
  }

  if (!isAuthenticated) {
    return <Login />
  }

  return (
    <AppWrapper>
      <SuppliersContextProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={SearchPage} />
            <Route exact path="/sandbox" component={SandboxPage} />
            <Route exact path="/item/:id" component={ItemPage} />
            <Route exact path="/create" component={CreatePage} />
            <Route path="*" component={MissingPage} />
          </Switch>
        </BrowserRouter>
      </SuppliersContextProvider>
    </AppWrapper>
  )
}

export default App
