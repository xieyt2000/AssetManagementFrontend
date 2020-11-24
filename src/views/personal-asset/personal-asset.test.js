import React from 'react'
import { Provider } from 'react-redux'

import PersonalAsset from './index'
import { store } from '@/utils/mockStore'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('peronal-asset', () => {
  const app = mount(<Provider store={store}><PersonalAsset/></Provider>)
  const personalAsset = app.find('PersonalAsset')
  personalAsset.setState({ assetList: [{}], rowData: { nid: 1 } })
  it('test fix cancel', () => {
    app.find('button').at(6).simulate('click')
    app.find('button').at(10).simulate('click')
  })
  it('test fix ok', () => {
    app.find('button').at(6).simulate('click')
    app.find('input').at(3).simulate('change', { target: {
      value: '123456'
    } })
    app.find('button').at(11).simulate('click')
  })
  it('test fix ok failed', () => {
    app.find('button').at(6).simulate('click')
    app.find('button').at(11).simulate('click')
  })
  it('test transfer cancel', () => {
    app.find('button').at(7).simulate('click')
    app.find('button').at(10).simulate('click')
  })
  it('test transfer ok', () => {
    app.find('button').at(7).simulate('click')
    app.find('input').at(3).simulate('change', { target: {
      value: '123456'
    } })
    app.find('button').at(11).simulate('click')
  })
  it('test transfer ok failed', () => {
    app.find('button').at(7).simulate('click')
    app.find('button').at(11).simulate('click')
  })
  it('test return cancel', () => {
    app.find('button').at(8).simulate('click')
    app.find('button').at(10).simulate('click')
  })
  it('test return ok', () => {
    app.find('button').at(8).simulate('click')
    app.find('button').at(11).simulate('click')
  })
})
