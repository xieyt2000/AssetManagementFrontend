import React from 'react'
import { Provider } from 'react-redux'
import IssuePersonal from './index'
import { store } from '@/utils/mockStore'

import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import '@/mock'
configure({ adapter: new Adapter() })

describe('issue-personal', function () {
  let app
  beforeEach(() => {
    app = mount(
      <Provider store={store}>
        <IssuePersonal/>
      </Provider>
    )
    app.find('IssuePersonal').setState({
      issueList: [{}]
    })
  })
  it('test unmount', () => {
    app.unmount()
  })
})
