import React from 'react'
import { Provider } from 'react-redux'

import Header from './index'
import { store } from '@/utils/mockStore'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { HashRouter } from 'react-router-dom'

configure({ adapter: new Adapter() })

describe('test Header', function () {
  it('test render', function () {
    const app = mount(
      <Provider store={store}>
        <HashRouter>
          <Header/>
        </HashRouter>
      </Provider>)
    app.unmount()
  })
})
