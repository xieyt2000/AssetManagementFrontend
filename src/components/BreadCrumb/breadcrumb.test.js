import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import BreadCrumb from './index'
import PERMISSION from '@/utils/permission'
import { HashRouter } from 'react-router-dom'
const mockStore = configureStore([])
describe('My Connected React-Redux Component', () => {
  let store
  let component
  beforeEach(() => {
    store = mockStore({
      user: {
        name: 'admin',
        role: [PERMISSION.SYSTEM, PERMISSION.STAFF, PERMISSION.IT, PERMISSION.ASSET]
      }
    })
    component = renderer.create(
      <Provider store={store}>
        <HashRouter>
          <BreadCrumb />
        </HashRouter>
      </Provider>
    )
  })
  it('should render with given state from Redux store', () => {

  })
  it('should dispatch an action on button click', () => {
  })
})
