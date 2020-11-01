import React, { Component } from 'react'
import { Table, Modal } from 'antd'
import { PropTypes } from 'prop-types'
import { getColumnSearchProps } from '../../../utils/table'

const Column = Table.Column

class HistoryTable extends Component {
  state = {
    searchText: '',
    searchedColumn: ''
  }

  render () {
    const { visible, onCancel, loading, history } = this.props
    return (
      <Modal visible={visible} onCancel={onCancel} footer={null} width='70%' title='历史记录'>
        <Table
          bordered rowKey="name"
          dataSource={history}
          pagination={false}
          loading={loading} style={{ whiteSpace: 'pre' }}>
          <Column title="时间" dataIndex="time" key="time" align="center"
            {...getColumnSearchProps('time', this, '时间')}/>
          <Column title="用户" dataIndex="user" key="user" align="center"
            {...getColumnSearchProps('user', this, '用户')}/>
          <Column title="操作类型" dataIndex="type" key="type" align="center"
            {...getColumnSearchProps('type', this, '操作类型')}/>
          <Column title="详情" dataIndex="info" key="info" align="center"
            {...getColumnSearchProps('info', this, '操作类型')}
          />
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
