import React from 'react'
import { Provider } from 'react-redux'

import AssetManagement from './index'
import { store } from '@/utils/mockStore'
import AssetInfo from './components/AssetInfo'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('Enzyme Shallow', function () {
  it('App\'s title should be Todos', function () {
    const app = mount(<Provider store={store}><AssetManagement/></Provider>)

    app.find('button').at(3).simulate('click')
    app.find('button').at(4).simulate('click')
    app.find(AssetInfo).find('button').at(1).simulate('click')
  })
})
