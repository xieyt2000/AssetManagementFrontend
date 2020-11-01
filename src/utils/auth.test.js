import { getToken, setToken, removeToken } from './auth'
describe('utils/auth', () => {
  it('test setToken', () => {
    setToken('123')
  })
  it('test getToken', () => {
    getToken()
  })
  it('test removeToken', () => {
    removeToken()
  })
})
