import React from 'react'
import { connect } from 'react-redux'

class AssetCollection extends React.Component {
  // constructor (props) {
  //   super(props)
  // }

  render () {
    return <div>资产领用</div>
  }
}

export default connect(state => state.user)(AssetCollection)
