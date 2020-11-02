import React from 'react'
import './index.less'
import BoxCard from './components/BoxCard'
import { Col } from 'antd'

const Dashboard = () => {
  return (
    <div className="app-container">
      <Col
        xs={24}
        sm={24}
        md={24}
        lg={12}
        xl={12}
        style={{ marginBottom: '30px' }}
      >
        <BoxCard />
      </Col>
    </div>
  )
}

export default Dashboard
