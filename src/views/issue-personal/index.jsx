import React from 'react'
import { connect } from 'react-redux'
import HelpCard from '../../components/HelpCard'
import { Table } from 'antd'
import { renderAssignee, renderIssueType, renderIssueStatus } from '../../utils/issue'
import { personalIssue } from '../../api/issue'
import { getList } from '../../utils/list'
const Column = Table.Column

class IssuePersonal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      issueList: [],
      rowData: {},
      modalVis: false,
      modalLod: false
    }
  }

  getIssue = () => {
    getList(personalIssue, this, 'issueList')
  }

  componentDidMount () {
    this.getIssue()
  }

  render () {
    const issueList = this.state.issueList
    const description = '作为企业员工，你可以在这里看到你提出的所有事项申请'
    return (
      <div className='app-container'>
        <HelpCard title='个人事项' source={description} />
        <Table
          bordered rowKey="name"
          dataSource={issueList}
          expandIconColumnIndex={-1}
          pagination={false}>
          <Column title="事项id" dataIndex="nid" key="nid" align="center"/>
          <Column title="涉及资产" dataIndex="asset" key="asset" align="center"/>
          <Column title="事件类型" key="type_name" align="center" render={renderIssueType}/>
          <Column title="接受人" key="initiator" align="center" render={renderAssignee}/>
          <Column title="状态" key="status" align="center" render={renderIssueStatus}/>
        </Table>
      </div>
    )
  }
}

export default connect(state => state.user)(IssuePersonal)
