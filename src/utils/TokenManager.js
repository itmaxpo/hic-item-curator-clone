/**
 * Token management service
 *
 */
class TokenManager {
  token = ''

  setToken = token => {
    this.token = token
  }

  getToken = () => {
    return this.token
  }
}

const tokenManager = new TokenManager()
export { tokenManager }
