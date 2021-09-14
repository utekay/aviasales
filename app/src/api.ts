import { IVisitor } from './types'

const TOKEN_KEY = 'token'
const API_ADDRESS = 'http://localhost:8000'

const createAPIProvider = () => {
  const getToken = () => window.localStorage.getItem(TOKEN_KEY) || ''
  const setToken = (token: string) => window.localStorage.setItem(TOKEN_KEY, token)

  const fetchWithToken = async (url: string, options?: RequestInit) => {
    const init = options ? options : {}
    const r = await fetch(url, {
      ...init,
      headers: {
        ...(init.headers || {}),
        'Authorization': getToken(),
        'Content-Type': 'application/json',
      },
    })
    if (r.ok === false) {
      throw new Error(`server returned ${r.status}`)
    }
    return r
  }

  const getVisitor = async (): Promise<IVisitor> => {
    const url = `${API_ADDRESS}/get-visitor`
    const r = await fetchWithToken(url)
    return r.json()
  }

  const setVisitorDidShare = async (): Promise<void> => {
    const url = `${API_ADDRESS}/set-visitor-did-share`
    await fetchWithToken(url, {
      method: 'POST',
    })
  }

  const setVisitorDidSubscribe = async (email: IVisitor['email']): Promise<void> => {
    const url = `${API_ADDRESS}/set-visitor-did-subscribe`
    await fetchWithToken(url, {
      method: 'POST',
      body: JSON.stringify({
        email,
      })
    })
  }

  return {
    getToken,
    setToken,
    getVisitor,
    setVisitorDidShare,
    setVisitorDidSubscribe,
  }
}

export const apiProvider = createAPIProvider()