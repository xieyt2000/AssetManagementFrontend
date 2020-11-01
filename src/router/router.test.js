import React from 'react'
import { Provider } from 'react-redux'

import Router from './index'
import { store } from '@/utils/mockStore'
import { configure, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('Rounter Test', function () {
  it('Rounter Test', function () {
    const app = render(
      <Provider store={store}>
        <Router/>
      </Provider>
    )
    console.log(app)
  })
})
