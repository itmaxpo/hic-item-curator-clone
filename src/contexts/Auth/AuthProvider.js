import React, { useState, useEffect, useContext } from 'react'
import queryString from 'query-string'
import createAuth0Client from '@auth0/auth0-spa-js'
import { tokenManager } from 'utils/TokenManager'
import { userMock, auth0ClientMock } from './mocks'

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname)

export const Auth0Context = React.createContext()
export const useAuth0 = () => useContext(Auth0Context)

/**
 * This is a Provider that provide user information after auth process
 * to the whole application
 *
 * @name Auth0Provider
 * @param {Object} onRedirectCallback
 * @returns
 */
export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState()
  const [user, setUser] = useState()
  const [auth0Client, setAuth0] = useState()
  const [loading, setLoading] = useState(true)
  const [popupOpen, setPopupOpen] = useState(false)

  const inTestingMode =
    !!window.Cypress ||
    queryString.parse(window.location.search).lighthouse === 'true' ||
    !!process.env.REACT_APP_CI

  useEffect(() => {
    if (inTestingMode) return

    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions)
      setAuth0(auth0FromHook)

      if (window.location.search.includes('code=')) {
        const { appState } = await auth0FromHook.handleRedirectCallback()
        onRedirectCallback(appState)
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated()

      setIsAuthenticated(isAuthenticated)

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser()
        try {
          const token = await auth0FromHook.getTokenSilently({
            audience: process.env.REACT_APP_AUTH_AUDIENCE,
            scope: 'read:all'
          })
          tokenManager.setToken(token)
        } catch (error) {
          console.warn('Nice try using stuff', error)
        }

        setUser(user)
      }

      setLoading(false)
    }
    initAuth0()
    // eslint-disable-next-line
  }, [])

  // effect to run if running app in E2E testing mode.
  // mocks auth0client.
  // only runs on mount.
  useEffect(() => {
    if (inTestingMode) {
      setIsAuthenticated(true)
      setUser(userMock)
      setAuth0(auth0ClientMock)
      setLoading(false)
    }
    // eslint-disable-next-line
  }, [])

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true)
    try {
      await auth0Client.loginWithPopup(params)
    } catch (error) {
      console.error(error)
    } finally {
      setPopupOpen(false)
    }
    const user = await auth0Client.getUser()

    setUser(user)
    setIsAuthenticated(true)
  }

  const handleRedirectCallback = async () => {
    setLoading(true)
    await auth0Client.handleRedirectCallback()
    const user = await auth0Client.getUser()

    setLoading(false)
    setIsAuthenticated(true)
    setUser(user)
  }

  const logout = (...p) => {
    if (tokenManager.getToken()) {
      tokenManager.setToken(null)
    }

    return auth0Client.logout(...p)
  }

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        logout
      }}
    >
      {children}
    </Auth0Context.Provider>
  )
}
