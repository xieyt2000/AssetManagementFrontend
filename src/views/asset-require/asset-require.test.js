import React from 'react'
import { Provider } from 'react-redux'
import AssetRequire from './index'
import { store } from '@/utils/mockStore'

import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import '@/mock'
configure({ adapter: new Adapter() })

describe('asset-require', function () {
  let app
  beforeEach(() => {
    app = mount(
      <Provider store={store}>
        <AssetRequire/>
      </Provider>
    )
    app.find('AssetRequire').setState({
      assetList: [{}]
    })
  })
  it('test cancel', function () {
    app.find('button').simulate('click')
  })
})
