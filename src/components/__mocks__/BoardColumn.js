import React from 'react'
import PropTypes from 'prop-types'

class BoardColumn extends React.Component {
  render () {
    return this.props.date.toLocaleDateString()
  }
}

BoardColumn.propTypes = {
  date: PropTypes.instanceOf(Date)
}

export default BoardColumn
