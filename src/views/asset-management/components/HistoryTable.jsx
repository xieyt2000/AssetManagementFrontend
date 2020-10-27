import React, { Component } from 'react'
import { Table, Modal } from 'antd'
import { PropTypes } from 'prop-types'

const Column = Table.Column

class HistoryTable extends Component {
  render () {
    const { visible, onCancel, loading, history } = this.props
    return (
      <Modal visible={visible} onCancel={onCancel} footer={null} width='70%'>
        <Table
          bordered rowKey="name"
          dataSource={history}
          pagination={false}
          loading={loading}>
          <Column title="时间" dataIndex="time" key="time" align="center"/>
          <Column title="用户" dataIndex="user" key="user" align="center"/>
          <Column title="操作类型" dataIndex="type" key="type" align="center"/>
          <Column title="详情" dataIndex="info" key="info" align="center"/>
        </Table>
      </Modal>
    )
  }
}

HistoryTable.propTypes = {
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  loading: PropTypes.bool,
  history: PropTypes.array
}

export default HistoryTable
