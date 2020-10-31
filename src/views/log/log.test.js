import React from 'react'
import Log from './index'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import '@/mock'

configure({ adapter: new Adapter() })

describe('Test log', function () {
  it('Test log', async function () {
    const app = mount(
      <Log/>
    )
    const instance = await app.instance()
    expect(instance.state.logs.length).toBe(0)
  })
})
