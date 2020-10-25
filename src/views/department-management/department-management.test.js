import React from 'react'

import DepartmentManagement from './index'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('Test DepartmentManagement', function () {
  it('Test DepartmentManagement', function () {
    const app = mount(<DepartmentManagement/>)
    console.log(app.find('input').at(0))
    app.setState({
      departments: [{ id: 1,
        name: 'd1',
        children: [
          { id: 2, name: 'd2', children: [] },
          { id: 3, name: 'd3', children: [] }
        ] }],
      departmentList: [
        { id: 1, name: 'd1' },
        { id: 2, name: 'd2' },
        { id: 3, name: 'd3' }
      ],
      expandedKeys: ['6']
    })
    app.find('input').at(0).simulate('change')
    // app.find('button').at(4).simulate('click')
    // app.find(AssetInfo).find('button').at(1).simulate('click')
  })
})
