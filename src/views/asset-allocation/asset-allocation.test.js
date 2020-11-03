import React from 'react'

import AssetAllocation from './index'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

describe('test AssetAllocation ', () => {
  it('render AssetAllocation', () => {
    const app = mount(<AssetAllocation/>)
    app.setState({ selectedRowKeys: [1] })
    app.find('button').at(0).simulate('click')
  })
})
