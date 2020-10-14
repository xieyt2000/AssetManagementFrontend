import React from 'react'
import './index.less'
import BoxCard from './components/BoxCard'
import AssetTable from './components/AssetTable'
import { Row, Col } from 'antd'

const Dashboard = () => {
  return (
    <div className="app-container">
      <Row gutter={32}>
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
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={12}
          xl={12}
          style={{ paddingRight: '16px', marginBottom: '30px' }}
        >
          <AssetTable />
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
