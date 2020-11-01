import user from './user'
import * as types from '../action-types'
describe('reducers/user', () => {
  const testUserInfo = {
    name: 'yy',
    role: [],
    avatar: '',
    token: ''
  }
  const actionToken = {
    type: types.USER_SET_USER_TOKEN,
    token: '123'
  }
  const actionInfo = {
    type: types.USER_SET_USER_INFO,
    name: 'yyyy',
    role: []
  }
  const actionReset = {
    type: types.USER_RESET_USER
  }
  const action = {
    type: ''
  }

  it('test user USER_SET_USER_TOKEN', () => {
    const res = user(testUserInfo, actionToken)
    expect(res).toHaveProperty('token', '123')
  })
  it('test user USER_SET_USER_INFO', () => {
    const res = user(testUserInfo, actionInfo)
    expect(res).toHaveProperty('name', 'yyyy')
  })
  it('test user USER_RESET_USER', () => {
    const res = user(testUserInfo, actionReset)
    expect(res).toMatchObject({})
  })
  it('test user default', () => {
    const res = user(testUserInfo, action)
    expect(res).toHaveProperty('name')
  })
})
