import React from 'react'
import { connect } from 'react-redux'

class PersonalAsset extends React.Component {
  // constructor (props) {
  //   super(props)
  // }

  render () {
    return (<div className='app-container'> <div>个人资产</div></div>)
  }
}

export default connect((state) => state.user)(PersonalAsset)
