import React from 'react'
import { Modal, Button, Descriptions } from 'antd'
import { PropTypes } from 'prop-types'

class AssetInfo extends React.Component {
  getCustomPropDescription (customProps) {
    const resArr = []
    if (customProps === undefined || customProps === null) {
      return resArr
    }
    Object.keys(customProps).forEach((propName) => {
      resArr.push(
        <Descriptions.Item label={propName}>
          {customProps[propName]}
        </Descriptions.Item>
      )
    })

    return resArr
  }

  render () {
    const { visible, onExit, confirmLoading, rowData } = this.props
    const {
      type_name: isQuantity, quantity, value, name, description, parent, children,
      owner, department, status, start_time: startTime, prop, service_life: serviceLife,
      now_value: nowValue, nid: id, custom
    } = rowData
    return (
      <div>
        <Modal title="资产详情" visible={visible}
          onCancel={onExit} confirmLoading={confirmLoading}
          footer={[
            // 定义右下角 按钮的地方 可根据需要使用 一个或者 2个按钮
            <Button key="submit" type="primary" onClick={onExit}>
                   返回
            </Button>]}
        >
          <Descriptions column={3}>
            <Descriptions.Item label='id' span={3}>{id}</Descriptions.Item>
            <Descriptions.Item label='名称' span={3}>{name}</Descriptions.Item>
            <Descriptions.Item label='描述' span={3}>{description}</Descriptions.Item>
            <Descriptions.Item label='挂账人' span={3}>{owner}</Descriptions.Item>
            <Descriptions.Item label='部门' span={3}>{department}</Descriptions.Item>
            <Descriptions.Item label='状态' span={3}>{status}</Descriptions.Item>
            <Descriptions.Item label='录入时间' span={3}>{startTime}</Descriptions.Item>
            <Descriptions.Item label='类型'>
              {isQuantity === 'AMOUNT' ? '数量型' : '条目型'}
            </Descriptions.Item>
            <Descriptions.Item label='数量' span={2}>{quantity}</Descriptions.Item>
            <Descriptions.Item label='原价值'>{value}</Descriptions.Item>
            <Descriptions.Item label='当前价值'>{nowValue}</Descriptions.Item>
            <Descriptions.Item label='使用年限'>{serviceLife + '年'}</Descriptions.Item>
            <Descriptions.Item label='父资产'>{parent}</Descriptions.Item>
            <Descriptions.Item label='子资产' span={2}>{children}</Descriptions.Item>
            <Descriptions.Item label='自定义属性' span={3}>{prop}</Descriptions.Item>
            {this.getCustomPropDescription(custom)}
          </Descriptions>
        </Modal>
      </div>
    )
  }
}

AssetInfo.propTypes = {
  visible: PropTypes.bool,
  onExit: PropTypes.func,
  confirmLoading: PropTypes.func,
  form: PropTypes.object,
  rowData: PropTypes.object // refer to `rowData` in ../index.js
}

export default AssetInfo
