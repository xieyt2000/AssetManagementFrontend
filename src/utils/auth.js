import Cookies from 'js-cookie'

const TokenKey = 'Token'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  const exp = new Date()
  exp.setTime(exp.getTime() - 1)
  const val = getToken()
  if (val != null) {
    document.cookie = 'Token' + '=' + val + ';expires=' + exp.toGMTString()
  }
}
