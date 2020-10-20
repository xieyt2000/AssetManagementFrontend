import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import { HashRouter } from 'react-router-dom'
import { store } from '@/utils/mockStore'
import LayoutHeader from './index'
describe('LayoutHeader test', () => {
  let component
  beforeEach(() => {
    component = renderer.create(
      <Provider store={store}>
        <HashRouter>
          <LayoutHeader />
        </HashRouter>
      </Provider>
    )
  })
  afterEach(() => {
    component.unmount()
  })
  it('render', () => {
  })
})
