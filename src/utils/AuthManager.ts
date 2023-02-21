import { Auth0Client, LogoutOptions, GenericError } from '@auth0/auth0-spa-js'

type AuthEvent = 'login_success' | 'login_failed'

/**
 * Returns a wrapper which will execute single fn at a point of time.
 */
let synchronise = <Args extends [], Return>(fn: (...args: Args) => Promise<Return>) => {
  let inProgress: Promise<Return> | null = null

  return async (...args: Args) => {
    try {
      return await (inProgress = inProgress ?? fn(...args))
    } finally {
      inProgress = null
    }
  }
}

class AuthManager {
  private client = new Auth0Client({
    domain: process.env.REACT_APP_AUTH_DOMAIN!,
    clientId: process.env.REACT_APP_AUTH_CLIENT_ID!,
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: process.env.REACT_APP_PARTNERS_API,
      scope: 'read:all'
    }
  })

  loginWithPopup = () => this.client.loginWithPopup()

  logout = (arg?: LogoutOptions) => this.client.logout(arg)

  getUser = () => this.client.getUser()

  async getToken() {
    try {
      return await this.client.getTokenSilently()
    } catch (e) {
      if (e instanceof GenericError) {
        if (e.error === 'login_required') {
          return this.getTokenWithPopup()
        }

        throw e
      }
    }
  }

  private getTokenWithPopup = synchronise(async () => {
    try {
      let token = await this.client.getTokenWithPopup()

      this.notify('login_success')

      return token
    } catch (e) {
      this.notify('login_failed')
      throw e
    }
  })

  private eventBus = new EventTarget()

  subscribe(cb: (event: AuthEvent) => void) {
    let listener = (e: Event) => cb((e as CustomEvent).detail)

    this.eventBus.addEventListener('', listener)
    return () => this.eventBus.removeEventListener('', listener)
  }

  private notify(event: AuthEvent) {
    this.eventBus.dispatchEvent(new CustomEvent('', { detail: event }))
  }
}

let __mock = {
  getToken: () => '',
  loginWithPopup: () => undefined,
  getUser: () => ({}),
  subscribe: () => () => undefined,
  logout: () => null
}

const inTestingMode =
  // @ts-ignore
  !!window.Cypress || !!process.env.REACT_APP_CI

export const authManager = inTestingMode ? __mock : new AuthManager()
