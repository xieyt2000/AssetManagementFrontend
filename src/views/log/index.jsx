import React, { Component } from 'react'
import { getLog } from '@/api/log'
import { Table, message } from 'antd'
import HelpCard from '../../components/HelpCard'

const Column = Table.Column

class Log extends Component {
  constructor (props) {
    super(props)
    this.state = {
      logs: []
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
          dataSource={logs}>
          <Column title="时间" dataIndex="time" key="time" align="center"/>
          <Column title="信息" dataIndex="message" key="message" align="center"/>
          <Column title="使用API" dataIndex="path" key="path" align="center"/>
        </Table>
      </div>
    )
  }

  // avoid naming conflict with api.getUsers
  localGetLog = async () => {
    const res = await getLog({ size: 100 })
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
