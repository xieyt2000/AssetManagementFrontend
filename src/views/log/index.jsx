import React, { Component } from 'react'
import { getLog } from '@/api/log'
import { Table, message } from 'antd'
import HelpCard from '../../components/HelpCard'
import { getColumnSearchProps } from '../../utils/table'

const Column = Table.Column

class Log extends Component {
  constructor (props) {
    super(props)
    this.state = {
      logs: [],
      searchText: '',
      searchedColumn: ''
    }
  }

  render () {
    const logs = this.state.logs
    const description = '作为系统管理员，你可以浏览本系统的使用日志'
    return (
      <div className='app-container'>
        <HelpCard title='日志浏览' source={description}/>
        <br/>
        <Table
          bordered rowKey="name"
          dataSource={logs}
          // pagination={false}
        >
          <Column title="时间" dataIndex="time" key="time" align="center"
            {...getColumnSearchProps('time', this, '时间')}/>
          <Column title="返回信息" dataIndex="message" key="message" align="center"
            {...getColumnSearchProps('message', this, '返回信息')}/>
          <Column title="使用API" dataIndex="path" key="path" align="center"
            {...getColumnSearchProps('path', this, '使用API')}/>
          <Column title="用户" dataIndex="username" key="username" align="center"
            {...getColumnSearchProps('username', this, '用户名')}/>
        </Table>
      </div>
    )
  }

  // avoid naming conflict with api.getUsers
  localGetLog = async () => {
    const res = await getLog({ size: 1000 })
    const { data: log, code } = res.data
    if (code === 200) {
      this.setState({
        logs: log
      })
    } else {
      message.error('获取日志失败，请检查网络连接后重试！')
    }
  }

  componentDidMount () {
    this.localGetLog()
  }
}

export default Log
