import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import Login from './index'
import configureStore from 'redux-mock-store'
const mockStore = configureStore([])
describe('Login test', () => {
  let component
  const store = mockStore({
    user: {
      name: '',
      role: []
    }
  })
  beforeEach(() => {
    component = renderer.create(
      <Provider store={store}>
        <Login/>
      </Provider>
    )
  })
  afterEach(() => {
    component.unmount()
  })
  it('render', () => {
    // expect(component.toJSON()).toMatchSnapshot()
  })
})
