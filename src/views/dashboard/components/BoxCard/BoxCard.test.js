import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import BoxCard from './index'
import PERMISSION from '@/utils/permission'
const mockStore = configureStore([])
describe('My Connected React-Redux Component', () => {
  let store
  let component
  beforeEach(() => {
    store = mockStore({
      user: {
        name: 'admin',
        role: [PERMISSION.SYSTEM, PERMISSION.STAFF]
      }
    })
    component = renderer.create(
      <Provider store={store}>
        <BoxCard />
      </Provider>
    )
  })
  it('should render with given state from Redux store', () => {
  })
  it('should dispatch an action on button click', () => {
  })
})
