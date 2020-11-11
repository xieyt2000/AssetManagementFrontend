import React from 'react'

import AssetAllocation from './index'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

describe('test AssetAllocation ', () => {
  it('render AssetAllocation', () => {
    const app = mount(<AssetAllocation/>)
    app.setState({ selectedRowKeys: [1], department: [{ name: '部门', value: '1', label: '部门' }] })

    app.find('TreeSelect').at(0).simulate('select', { value: '部门' })

    app.find('button').at(0).simulate('click')
  })
})
