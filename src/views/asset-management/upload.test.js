import React from 'react'

import UploadAsset from './upload/index'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('UploadAsset Test', function () {
  it('UploadAsset Test', function () {
    const app = mount(<UploadAsset/>)
    console.log(app)
  })
})
