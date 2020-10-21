import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import AssetManagement from './index'
import { store } from '@/utils/mockStore'

describe('AssetManagement test', () => {
  let component
  beforeEach(() => {
    component = renderer.create(
      <Provider store={store}>
        <AssetManagement/>
      </Provider>
    )
  })
  afterEach(() => {
    component.unmount()
  })
  it('render AssetManagement', () => {
  })
})
