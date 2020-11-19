import React from 'react'
import { Provider } from 'react-redux'
import IssueBoard from './index'
import { store } from '@/utils/mockStore'

import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import '@/mock'
configure({ adapter: new Adapter() })

describe('issue-board', function () {
  let app
  beforeEach(() => {
    app = mount(
      <Provider store={store}>
        <IssueBoard/>
      </Provider>
    )
    app.find('IssueBoard').setState({
      issueList: [{}]
    })
  })
  it('test refuse cancel', function () {
    app.find('button').at(9).simulate('click')
    app.find('Modal').find('button').at(1).simulate('click')
  })
  it('test refuse ok', function () {
    app.find('button').at(9).simulate('click')
    app.find('Modal').find('button').at(2).simulate('click')
  })
  it('test consent cancel', function () {
    app.find('button').at(8).simulate('click')
    app.find('Modal').find('button').at(1).simulate('click')
  })
  it('test consent ok', function () {
    app.find('button').at(8).simulate('click')
    app.find('Modal').find('button').at(2).simulate('click')
  })
})
