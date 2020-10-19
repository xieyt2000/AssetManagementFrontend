import React from 'react'
import renderer from 'react-test-renderer'
import AssetTable from './index'

describe('AssetTable test', () => {
  let component
  beforeEach(() => {
    component = renderer.create(
      <AssetTable/>
    )
  })
  afterEach(() => {
    component.unmount()
  })
  it('render AssetTable ', () => {
    // expect(component.toJSON()).toMatchSnapshot()
  })
})
