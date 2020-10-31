import React from 'react'

import AssetClassification from './index'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Input } from 'antd'
const { Search } = Input
configure({ adapter: new Adapter() })
const testState = {
  assetCategories: [
    {
      name: '资产',
      id: 1,
      children: [
        {
          name: '电子设备',
          id: 2,
          children: [
            {
              name: '计算机设备',
              id: 3,
              children: []
            }
          ]
        },
        {
          name: '电器设备',
          id: 4,
          children: [
            {
              name: '生活电器',
              id: 5,
              children: []
            }
          ]
        }
      ]
    }
  ],
  assetCategoriesList: [
    {
      name: '资产',
      id: 1
    },
    {
      name: '电子设备',
      id: 2
    },
    {
      name: '计算机设备',
      id: 3
    },
    {
      name: '电器设备',
      id: 4
    },
    {
      name: '生活电器',
      id: 5
    }
  ]
}

describe('AssetClassification test', function () {
  it('App\'s title should be Todos', async function () {
    const app = mount(<AssetClassification/>)
    console.log(app)
    app.setState({
      ...testState
    })
    const searchItem = app.find(Search)
    searchItem.simulate('change', { target: { value: '设备' } })
    // const treeItem = app.find(Tree)
    console.log(app.state().expandedKeys)
  })
})
