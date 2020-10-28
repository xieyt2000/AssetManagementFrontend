import React from 'react'
import { Modal, Button, Descriptions } from 'antd'
import { PropTypes } from 'prop-types'

class AssetInfo extends React.Component {
  render () {
    const { visible, onExit, confirmLoading, rowData } = this.props
    const { type_name: isQuantity, quantity, value, name, description, parent, children,
      owner, department, status, start_time: startTime, prop, service_life: serviceLife } = rowData
    return (
      <div>
        <Modal title = "资产详情" visible={visible}
          onCancel={onExit} confirmLoading={confirmLoading}
          footer={[
            // 定义右下角 按钮的地方 可根据需要使用 一个或者 2个按钮
            <Button key="submit" type="primary" onClick={onExit}>
                            返回
            </Button>]}
        >
          <Descriptions column={3}>
            <Descriptions.Item label='名称' span={3}>{name}</Descriptions.Item>
            <Descriptions.Item label='描述' span={3}>{description}</Descriptions.Item>
            <Descriptions.Item label='挂账人' span={3}>{owner}</Descriptions.Item>
            <Descriptions.Item label='部门' span={3}>{department}</Descriptions.Item>
            <Descriptions.Item label='状态' span={3}>{status}</Descriptions.Item>
            <Descriptions.Item label='录入时间' span={3}>{startTime}</Descriptions.Item>
            <Descriptions.Item label='类型'>
              {isQuantity === 'AMOUNT' ? '数量型' : '条目型'}
            </Descriptions.Item>
            <Descriptions.Item label='数量'>{quantity}</Descriptions.Item>
            <Descriptions.Item label='价值'>{value}</Descriptions.Item>
            <Descriptions.Item label='所属'>{parent}</Descriptions.Item>
            <Descriptions.Item label='包含'>{children}</Descriptions.Item>
            <Descriptions.Item label='使用年限' >{serviceLife + '年'}</Descriptions.Item>
            <Descriptions.Item label='自定义属性' span={3}>{prop}</Descriptions.Item>
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
