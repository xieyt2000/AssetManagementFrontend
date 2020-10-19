import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import { store } from '@/utils/mockStore'
import UserManagement from './index'
describe('user management test', () => {
  let component
  beforeEach(() => {
    component = renderer.create(
      <Provider store={store}>
        <UserManagement />
      </Provider>
    )
  })
  it('render', () => {
  })
})
