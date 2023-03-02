import { lazy, Suspense, useEffect, ReactNode } from 'react'
import styled from 'styled-components'
import { BrowserRouter, Route, useLocation, Routes } from 'react-router-dom'
import { COLORS } from '@tourlane/tourlane-ui'
import queryString from 'query-string'

import { ACCOMMODATION_ITEM_TYPE } from 'utils/constants'
import LoadingPage from 'pages/Loading'
import { authManager } from './utils/AuthManager'
import { NotificationProvider, useNotification } from 'components/Notification'
import { saveLastUrl } from './utils/saveLastUrl'

const AppWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`

const SearchPage = lazy(() => import(/* webpackChunkName: "SearchPage" */ 'pages/Search'))
const LoginPage = lazy(() => import(/* webpackChunkName: "LoginPage" */ 'pages/Login'))
const ItemPage = lazy(() => import(/* webpackChunkName: "ItemPage" */ 'pages/Item'))
const ActivityPage = lazy(() => import(/* webpackChunkName: "ActivityPage" */ 'pages/Activity'))
const AreaPage = lazy(() => import(/* webpackChunkName: "AreaPage" */ 'pages/Area'))
const CountryPage = lazy(() => import(/* webpackChunkName: "CountryPage" */ 'pages/Country'))
const AccommodationPage = lazy(
  () => import(/* webpackChunkName: "AccommodationPage" */ 'pages/Accommodation')
)
const MissingPage = lazy(
  () => import(/* webpackChunkName: "MissingPage" */ 'pages/HelperPages/Missing')
)

const AuthListener = ({ children }: { children: ReactNode }) => {
  const { enqueueNotification } = useNotification()
  const location = useLocation()

  useEffect(() => saveLastUrl(location), [location])

  useEffect(
    () =>
      authManager.subscribe((e) => {
        if (e === 'login_failed') {
          enqueueNotification({ variant: 'error', message: 'Login failed' })
          window.location.href = '/login'
        } else if (e === 'login_success') {
          enqueueNotification({ message: 'Login success' })
        }
      }),
    [enqueueNotification]
  )

  return <>{children}</>
}

export const App = () => {
  // Used to handle animation of changes between sticky header and search actions
  // In all other cases header always sticky
  const handleScroll = () => {
    const header = document.getElementById('sticky-header') as HTMLElement
    const stickyElement = document.getElementById('items-sticky-actions') as HTMLElement
    const showAllImageLibrary = document.getElementById('visible-images') as HTMLElement

    const generateConditions = (firstOffset: number, secondOffset: number) => {
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

    if (showAllImageLibrary) {
      const windowHeight = window.innerHeight || document.documentElement.clientHeight
      const rect = showAllImageLibrary.getBoundingClientRect()
      return rect.top <= windowHeight && rect.top + rect.height >= 0
    }
  }

  useEffect(() => {
    window?.addEventListener('scroll', handleScroll)

    return () => window?.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AppWrapper>
      <NotificationProvider>
        <BrowserRouter>
          <AuthListener>
            <Suspense fallback={<LoadingPage />}>
              <Routes>
                <Route path="/" element={<SearchPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/item/:id" element={<ItemPage />} />
                <Route path="/activity/:id" element={<ActivityPage />} />
                <Route path="/accommodation/:id" element={<AccommodationPage />} />
                <Route path="/area/:id" element={<AreaPage />} />
                <Route path="/country/:id" element={<CountryPage />} />
                <Route path="*" element={<MissingPage />} />
              </Routes>
            </Suspense>
          </AuthListener>
        </BrowserRouter>
      </NotificationProvider>
    </AppWrapper>
  )
}
