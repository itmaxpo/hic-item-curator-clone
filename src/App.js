import React, { useEffect, useState, lazy, Suspense } from 'react'
import styled from 'styled-components'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import { useAuth0 } from 'contexts/Auth'
import { COLORS } from '@tourlane/tourlane-ui'
import { SuppliersContextProvider } from './contexts/Suppliers'
import { NotificationProvider } from 'components/Notification'
import queryString from 'query-string'
import { ACCOMMODATION_ITEM_TYPE } from 'utils/constants'
import LoadingPage from 'pages/Loading'

const isSafari11 = () =>
  navigator.browserSpecs &&
  navigator.browserSpecs.name === 'Safari' &&
  Number(navigator.browserSpecs.version) >= 11

const AppWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
`

const SearchPage = lazy(() => import(/* webpackChunkName: "SearchPage" */ 'pages/Search'))
const LoginPage = lazy(() => import(/* webpackChunkName: "LoginPage" */ 'pages/Login'))
const CreatePage = lazy(() => import(/* webpackChunkName: "CreatePage" */ 'pages/Create'))
const ItemPage = lazy(() => import(/* webpackChunkName: "ItemPage" */ 'pages/Item'))
const MissingPage = lazy(() =>
  import(/* webpackChunkName: "MissingPage" */ 'pages/HelperPages/Missing')
)
const SafariPage = lazy(() =>
  import(/* webpackChunkName: "SafariPage" */ 'pages/HelperPages/Safari')
)

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
  const [showSafariPage, setShowSafariPage] = useState(isSafari11())

  // Used to handle animation of changes between sticky header and search actions
  // In all other cases header always sticky
  const handleScroll = () => {
    const header = document.getElementById('sticky-header')
    const stickyElement = document.getElementById('items-sticky-actions')

    const generateConditions = (firstOffset, secondOffset) => {
      if (header.offsetTop >= firstOffset) {
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
        if (header.offsetTop >= secondOffset) {
          stickyElement.style.backgroundColor = `${COLORS.SENSATION_WHITE}`
          stickyElement.style.boxShadow = '0 1px 4px 0 rgba(63, 65, 68, 0.3)'
        }
      }
    }

    // Header should be sticky until meets sticky Search Actions
    // TODO: fixed the styling when have query in URL handling
    if (stickyElement) {
      const type = queryString.parse(window.location.search).type
      // Because searchBox height changed based on type
      // There is a need to recalculate offset c hanges onScroll
      if (type === ACCOMMODATION_ITEM_TYPE) {
        generateConditions(600, 550)
      } else {
        generateConditions(500, 450)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  }, [])

  if (loading) {
    return <LoadingPage />
  }

  if (!isAuthenticated) {
    return (
      <Suspense fallback={<LoadingPage />}>
        <LoginPage />
      </Suspense>
    )
  }

  if (showSafariPage) {
    return (
      <Suspense fallback={<LoadingPage />}>
        <SafariPage onContinue={() => setShowSafariPage(false)} />
      </Suspense>
    )
  }

  return (
    <AppWrapper>
      <SuppliersContextProvider>
        <NotificationProvider>
          <BrowserRouter>
            <Suspense fallback={<LoadingPage />}>
              <Switch>
                <Route exact path="/" component={SearchPage} />
                <Route exact path="/item/:id" component={ItemPage} />
                <Route exact path="/create" component={CreatePage} />
                <Route path="*" component={MissingPage} />
              </Switch>
            </Suspense>
          </BrowserRouter>
        </NotificationProvider>
      </SuppliersContextProvider>
    </AppWrapper>
  )
}

export default App
