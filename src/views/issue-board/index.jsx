import React from 'react'
import { connect } from 'react-redux'
import HelpCard from '../../components/HelpCard'

class IssueBoard extends React.Component {
  render () {
    const description = '当前用户所有待处理的事项'
    return (
      <div className='app-container'>
        <HelpCard title='个人工作台' source={description} />
      </div>
    )
  }
}

export default connect(state => state.user)(IssueBoard)
