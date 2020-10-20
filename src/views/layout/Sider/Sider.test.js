import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import Sider from './index'
import { store } from '@/utils/mockStore'
import { HashRouter } from 'react-router-dom'

describe('Sider test', () => {
  let component
  beforeEach(() => {
    component = renderer.create(
      <Provider store={store}>
        <HashRouter>
          <Sider/>
        </HashRouter>
      </Provider>
    )
  })
  afterEach(() => {
    component.unmount()
  })
  it('render Sider', () => {
  })
})
