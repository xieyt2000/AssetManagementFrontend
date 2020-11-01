import * as Action from './user'
import * as types from '../action-types'
describe('actions/user', () => {
  it('test resetUser', () => {
    const action = Action.resetUser()
    expect(action).toHaveProperty('type', types.USER_RESET_USER)
  })
  it('test setUserInfo', () => {
    const action = Action.setUserInfo()
    expect(action).toHaveProperty('type', types.USER_SET_USER_INFO)
  })
  it('test setUserToken', () => {
    const action = Action.setUserToken()
    expect(action).toHaveProperty('type', types.USER_SET_USER_TOKEN)
  })
})
