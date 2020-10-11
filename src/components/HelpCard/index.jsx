import { Card } from 'antd'
import React from 'react'
import { PropTypes } from 'prop-types'

const HelpCard = (props) => {
  return (
    <Card bordered={false} className='card-item' title={props.title}>
      <p dangerouslySetInnerHTML={{ __html: props.source }}/>
    </Card>
  )
}

HelpCard.propTypes = {
  title: PropTypes.string,
  source: PropTypes.string
}

HelpCard.defaultProps = {
  title: '',
  source: ''
}

export default HelpCard
