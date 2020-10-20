import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import BoxCard from './index'
import { store } from '@/utils/mockStore'

describe('BoxCard test', () => {
  let component
  beforeEach(() => {
    component = renderer.create(
      <Provider store={store}>
        <BoxCard/>
      </Provider>
    )
  })
  afterEach(() => {
    component.unmount()
  })
  it('render BoxCard', () => {
    // expect(component.toJSON()).toMatchSnapshot()
    expect(component.root.findByProps({ alt: 'example' }).props.style.height).toBe('300px')
  })
})
