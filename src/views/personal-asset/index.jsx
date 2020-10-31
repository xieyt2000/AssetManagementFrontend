import React from 'react'
import { connect } from 'react-redux'
import HelpCard from '../../components/HelpCard'
class PersonalAsset extends React.Component {
  // constructor (props) {
  //   super(props)
  // }

  render () {
    const description = '查看个人名下的资产，并进行有关操作'
    return (
      <div className='app-container'>
        <HelpCard title='个人资产' source={description} />
      </div>
    )
  }
}

export default connect((state) => state.user)(PersonalAsset)
