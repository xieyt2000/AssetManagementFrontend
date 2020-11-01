import React from 'react'
import { Provider } from 'react-redux'

import Login from './index'
import { store } from '@/utils/mockStore'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { HashRouter } from 'react-router-dom'

configure({ adapter: new Adapter() })

describe('Login Test', function () {
  it('Login Test', function () {
    const app = mount(
      <Provider store={store}>
        <HashRouter>
          <Login/>
        </HashRouter>
      </Provider>)
    console.log(app)
  })
})
