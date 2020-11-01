import * as Action from './app'
import * as types from '../action-types'
describe('actions/app', () => {
  it('test toggleSiderBar', () => {
    const action = Action.toggleSiderBar()
    expect(action).toHaveProperty('type', types.APP_TOGGLE_SIDEBAR)
  })
  it('test toggleSettingPanel', () => {
    const action = Action.toggleSettingPanel()
    expect(action).toHaveProperty('type', types.APP_TOGGLE_SETTINGPANEL)
  })
})
