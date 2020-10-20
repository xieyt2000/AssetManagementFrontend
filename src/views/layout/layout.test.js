import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import Layout from './index'
import { store } from '@/utils/mockStore'
import { HashRouter } from 'react-router-dom'

describe('Layout test', () => {
  let component
  beforeEach(() => {
    component = renderer.create(
      <Provider store={store}>
        <HashRouter>
          <Layout/>
        </HashRouter>
      </Provider>
    )
  })
  afterEach(() => {
    component.unmount()
  })
  it('render Layout', () => {
  })
})
