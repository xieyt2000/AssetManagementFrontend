import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import BreadCrumb from './index'
import { HashRouter } from 'react-router-dom'
import { store } from '@/utils/mockStore'
describe('BreadCrumb test', () => {
  let component
  beforeEach(() => {
    component = renderer.create(
      <Provider store={store}>
        <HashRouter>
          <BreadCrumb />
        </HashRouter>
      </Provider>
    )
  })
  it('render BreadCrumb', () => {
  })
})
