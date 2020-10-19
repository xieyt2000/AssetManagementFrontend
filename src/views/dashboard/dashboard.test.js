import React from 'react'
import renderer from 'react-test-renderer'
import Dashboard from './index'
import { Provider } from 'react-redux'
import { store } from '@/utils/mockStore'

describe('Dashboard test', () => {
  let component
  beforeEach(() => {
    component = renderer.create(
      <Provider store={store}>
        <Dashboard/>
      </Provider>
    )
  })
  it('render Dashboard', () => {
    expect(component.root.findByProps({ className: 'app-container' })
      .props.className).toBe('app-container')
  })
})
