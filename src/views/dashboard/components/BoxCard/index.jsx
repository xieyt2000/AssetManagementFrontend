import React, { Component } from 'react'
import { Card } from 'antd'
import { connect } from 'react-redux'
import './index.less'
import PropTypes from 'prop-types'
import PERMISSION from '../../../../utils/permission'

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
        default:
          break
      }
    }
    return roleString
  }

  render () {
    const { name, role } = this.props
    return (
      <div className="box-card-component">
        <Card
          cover={
            <img
              alt="example"
              src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png"
              style={{ height: '480px' }}
            />
          }
        >
          <div style={{ position: 'relative' }}>
            <div style={{ paddingTop: '35px' }} className="progress-item">
              <span>用户：{name}</span>
            </div>
            <div className="progress-item">
              <span>权限：{this.convertRoleToString(role)}</span>
            </div>
          </div>
        </Card>
      </div>
    )
  }
}

BoxCard.propTypes = {
  name: PropTypes.string,
  role: PropTypes.array
}

export default connect((state) => state.user)(BoxCard)
