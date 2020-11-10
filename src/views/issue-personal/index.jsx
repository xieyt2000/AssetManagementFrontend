import React from 'react'
import { connect } from 'react-redux'
import HelpCard from '../../components/HelpCard'
import { Button, Card, Modal, Table } from 'antd'
import { renderIssueType } from '../../utils/issue'
import { personalIssue, deleteIssue } from '../../api/issue'
import { getList } from '../../utils/list'
import { handleResponse } from '../../utils/response'

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

  handleCancelClick = (row) => {
    this.setState({
      modalVis: true,
      rowData: Object.assign({}, row)
    })
  }

  handleCancel = () => {
    this.setState({
      modalVis: false
    })
  }

  handleOk = () => {
    this.setState({
      modalLod: true
    })
    const data = {
      nid: this.state.rowData.nid
    }
    handleResponse(deleteIssue(data), '删除事项', this, null,
      { modalVis: false, modalLod: false }, this.getIssue)
  }

  render () {
    const issueList = this.state.issueList
    const description = '作为企业员工，你可以在这里看到你提出的所有事项申请'
    return (
      <div className='app-container'>
        <HelpCard title='我的申请' source={description}/>
        <br/>
        <Card>
          <Table
            bordered rowKey="name"
            dataSource={issueList}
            expandIconColumnIndex={-1}
            pagination={false}>
            <Column title="发起人" dataIndex="initiator" key="initiator" align="center"/>
            <Column title="事件类型" key="type_name" align="center" render={renderIssueType}/>
            <Column title="涉及资产" dataIndex="asset" key="asset" align="center"/>
            <Column title="信息" dataIndex="info" key="info" align="center"/>
            <Column title="操作" key="action" width={200} align="center" render={(row) => (
              <span>
                <Button type="primary" shape="circle" icon="close" title="取消"
                  onClick={this.handleCancelClick.bind(this, row)}/>
              </span>)}/>
          </Table>
          <Modal
            title='删除事项'
            visible={this.state.modalVis}
            confirmLoading={this.state.modalLod}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <p>是否删除事项？</p>
          </Modal>
        </Card>
      </div>
    )
  }
}

export default connect(state => state.user)(IssuePersonal)
