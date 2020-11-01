import React from 'react'
import { Icon } from 'antd'
import AssetCustom from './index'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import '@/mock'
configure({ adapter: new Adapter() })

describe('asset-custom', function () {
  it('AssetCustom render', function () {
    const app = mount(<AssetCustom/>)
    app.find('button').at(0).simulate('click') // 添加属性
    const input = app.find('input').at(0)
    input.value = 'Blah blah'
    input.simulate('change')
    app.find('button').at(1).simulate('click')
    app.find(Icon).at(0).simulate('click')
    app.find(Icon).at(0).simulate('click')
  })
})
