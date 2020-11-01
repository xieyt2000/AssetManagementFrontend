import app from './app'
import * as types from '../action-types'
describe('reducers/app', () => {
  const testState = {
    sidebarCollapsed: false,
    settingPanelVisible: false
  }
  const action1 = {
    type: types.APP_TOGGLE_SIDEBAR
  }
  const action2 = {
    type: types.APP_TOGGLE_SETTINGPANEL
  }
  const action3 = {
    type: ''
  }
  it('test app APP_TOGGLE_SIDEBAR', () => {
    const res = app(testState, action1)
    expect(res).toHaveProperty('sidebarCollapsed', true)
  })
  it('test app APP_TOGGLE_SETTINGPANEL', () => {
    const res = app(testState, action2)
    expect(res).toHaveProperty('settingPanelVisible', true)
  })
  it('test app defaultL', () => {
    const res = app(testState, action3)
    expect(res).toHaveProperty('sidebarCollapsed')
  })
})
