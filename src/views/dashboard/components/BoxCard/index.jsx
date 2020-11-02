import React, { Component } from 'react'
import { Descriptions, Card } from 'antd'
import { connect } from 'react-redux'
import './index.less'
import PropTypes from 'prop-types'
import PERMISSION from '@/utils/permission'

class BoxCard extends Component {
  state = {}

  convertRoleToString (arr) {
    let roleString = ''
    for (let i = 0; i < arr.length; i++) {
      switch (arr[i]) {
        case PERMISSION.IT:
          roleString += 'IT管理员、'
          break
        case PERMISSION.ASSET:
          roleString += '资产管理员、'
          break
        case PERMISSION.SYSTEM:
          roleString += '系统管理员、'
          break
        case PERMISSION.STAFF:
          roleString += '员工'
          break
      }
    }
    return roleString
  }

  render () {
    const { name, role, department } = this.props
    return (
      <div className="box-card-component">
        <Card
          cover={
            <img
              alt="example"
              src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png"
              style={{ height: '300px' }}
            />
          }
        >
          <Descriptions title="用户信息" column={1}>
            <Descriptions.Item label="用户名" span={1}>{name}</Descriptions.Item>
            <Descriptions.Item label="角色" span={1}>{this.convertRoleToString(role)}
            </Descriptions.Item>
            <Descriptions.Item label="部门" span={1}>{department}</Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    )
  }
}

BoxCard.propTypes = {
  name: PropTypes.string,
  role: PropTypes.array,
  department: PropTypes.string
}

export default connect((state) => state.user)(BoxCard)
