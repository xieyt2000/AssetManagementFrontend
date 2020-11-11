import React from 'react'

import UserManagement from './index'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })
const appState = {
  users: [
    {
      name: 'admin',
      department: '部门',
      department_id: 1,
      is_active: true,
      role: ['IT', 'ASSET', 'SYSTEM', 'STAFF'],
      roleStr: 'IT管理员，资产管理员，系统管理员，员工'
    }
  ],
  rowData: {
    name: 'admin',
    department: '部门',
    department_id: 1,
    is_active: true,
    role: ['IT', 'ASSET', 'SYSTEM', 'STAFF'],
    roleStr: 'IT管理员，资产管理员，系统管理员，员工'
  },
  departmentList: [
    {
      name: '部门',
      label: '部门',
      value: 1
    }
  ]
}

describe('test UserManagement', function () {
  const app = mount(<UserManagement/>)
  app.setState(appState)
  it('test lock', function () {
    app.find('button').at(1).simulate('click')
    app.find('button').at(1).simulate('click')
  })
  it('test edit cancel', function () {
    app.find('button').at(2).simulate('click')
    app.find('button').at(5).simulate('click')
  })
  it('test edit ok', function () {
    app.find('button').at(2).simulate('click')
    app.find('button').at(6).simulate('click')
    app.setState({
      editModalVis: false,
      editModalLod: false
    })
  })
  it('test delete cancel', function () {
    app.find('button').at(3).simulate('click')
    app.find('button').at(5).simulate('click')
  })
  it('test delete ok', function () {
    app.find('button').at(3).simulate('click')
    app.find('button').at(6).simulate('click')
  })
  it('test add cancel', function () {
    app.find('button').at(0).simulate('click')
    app.find('button').at(5).simulate('click')
  })
  it('test add ok', function () {
    app.find('button').at(0).simulate('click')
    app.find('button').at(6).simulate('click')
  })
})
