import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import Login from './index'
import configureStore from 'redux-mock-store'
import PERMISSION from '@/utils/permission'
const mockStore = configureStore([])
describe('BoxCard test', () => {
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
  it('render BoxCard', () => {
    // expect(component.toJSON()).toMatchSnapshot()
  })
})
