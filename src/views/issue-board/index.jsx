import React from 'react'
import { connect } from 'react-redux'
import HelpCard from '../../components/HelpCard'
import { Button, Divider, Table } from 'antd'
import { issueToHandle } from '../../api/issue'
import { renderAssignee, renderChineseIssue } from '../../utils/issue'
const Column = Table.Column

class IssueBoard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      issueList: [],
      rowData: {},
      modalVis: false,
      modalLod: false
    }
  }

    getIssue = async () => {
      const res = await issueToHandle()
      const { data: issues, code } = res.data
      if (code === 200) {
        this.setState({
          issueList: issues
        })
      }
    }

    componentDidMount () {
      this.getIssue()
    }

    render () {
      const issueList = this.state.issueList
      const description = '当前用户所有待处理的事项'
      return (
        <div className='app-container'>
          <HelpCard title='个人工作台' source={description} />
          <Table
            bordered rowKey="name"
            dataSource={issueList}
            expandIconColumnIndex={-1}
            pagination={false}>
            <Column title="事项id" dataIndex="nid" key="nid" align="center"/>
            <Column title="发起人" dataIndex="initiator" key="initiator" align="center"/>
            <Column title="涉及资产" dataIndex="asset" key="asset" align="center"/>
            <Column title="事件类型" key="type_name" align="center" render={renderChineseIssue}/>
            <Column title="接受人" key="initiator" align="center"
              render={renderAssignee}
            />
            <Column title="操作" key="action" width={200} align="center" render={(row) => (
              <span>
                <Button type="primary" shape="circle" icon="check-circle" title="批准"
                  onClick={this.handlePermit.bind(this, row)}/>
                <Divider type="vertical" />
                <Button type="primary" shape="circle" icon="close-circle" title="拒绝"
                  onClick={this.handleRefuse.bind(this, row)} />
              </span>)}/>
          </Table>
        </div>
      )
    }

  handlePermit = () => {
  }

  handleRefuse = () => {
  }
}

export default connect(state => state.user)(IssueBoard)
