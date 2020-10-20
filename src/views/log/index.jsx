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
      // pageNumber: 1,
      // pageSize: 20
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
          pagination={false}>
          <Column title="时间" dataIndex="time" key="time" align="center"/>
          <Column title="返回信息" dataIndex="message" key="message" align="center"/>
          <Column title="使用API" dataIndex="path" key="path" align="center"/>
          <Column title="用户" dataIndex="username" key="username" align="center"/>
        </Table>
        {/* <Pagination */}
        {/*  total={this.state.total} */}
        {/*  pageSizeOptions={['10', '20', '40']} */}
        {/*  showTotal={(total) => `共${total}条数据`} */}
        {/*  onChange={this.changePage} */}
        {/*  current={this.state.pageNumber} */}
        {/*  showSizeChanger */}
        {/*  showQuickJumper */}
        {/*  hideOnSinglePage={true} */}
        {/* /> */}
      </div>
    )
  }

  // changePage = () => {
  //
  // }
  //
  // changePageSize = () => {
  //
  // }

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
