import React from 'react'
import { connect } from 'react-redux'
import HelpCard from '../../components/HelpCard'
import { personalAssetList } from '../../api/asset'
import { Button, Divider, Table } from 'antd'
import InputForm from './components/InputForm'
import { handleResponse } from '@/utils/response'
import { applyFix, applyTransfer, applyReturn } from '@/api/issue'

const Column = Table.Column

class PersonalAsset extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      assetList: [],
      modalTitle: '',
      modalVis: false,
      modalLod: false,
      modalOk: null,
      formRef: null,
      rowData: {}
    }
  }

  render () {
    const description = '查看个人名下的资产，并进行维保、转移等操作'
    const assetList = this.state.assetList
    return (
      <div className='app-container'>
        <HelpCard title='个人资产' source={description} />
        <Table
          bordered rowKey="name"
          dataSource={assetList}
          expandIconColumnIndex={-1}
          pagination={false}>
          <Column title="资产id" dataIndex="nid" key="nid" align="center"/>
          <Column title="资产名称" dataIndex="name" key="name" align="center"/>
          {/* <Column title="挂账人" dataIndex="owner" key="owner" align="center"/> */}
          {/* <Column title="所属部门" dataIndex="department" key="department" align="center"/> */}
          <Column title="资产类型" key="type_name" align="center"
            render={(row) => (
              <span> {((row) => {
                if (row.type_name === 'AMOUNT') {
                  const str = '数量型'
                  const quantity = '数量：' + row.quantity
                  return (<span>{str}<br/>{quantity}</span>)
                } else {
                  return '条目型'
                }
              })(row)} </span>
            )}/>
          <Column title="资产分类" dataIndex="category" key="category" align="center"/>
          <Column title="资产状态" dataIndex="status" key="status" align="center" />
          <Column title="操作" key="action" width={200} align="center" render={(row) => (
            <span>
              <Button type="primary" shape="circle" icon="edit" title="申请维保"
                onClick={this.handleFixClick.bind(this, row)}/>
              <Divider type="vertical"/>
              <Button type="primary" shape="circle" icon="edit" title="申请转移"
                onClick={this.handleTransferClick.bind(this, row)}/>
              <Divider type="vertical"/>
              <Button type="primary" shape="circle" icon="edit" title="申请退库"
                onClick={this.handleReturnClick.bind(this, row)}/>
            </span>)}/>
        </Table>
        <InputForm
          wrappedComponentRef={(formRef) => {
            this.formRef = formRef
          }}
          visible={this.state.modalVis}
          confirmLoading={this.state.modalLod}
          onCancel={this.handleCancel}
          onOk={this.state.modalOk}
          title={this.state.modalTitle}
          label={this.state.modalLabel}
        />
      </div>
    )
  }

  handleFixClick = (row) => {
    this.setState({
      rowData: Object.assign({}, row),
      modalVis: true,
      modalTitle: '申请资产维保',
      modalLabel: '维修人 ',
      modalOk: this.handleOkFix
    })
  }

  handleOkFix = () => {
    const form = this.formRef.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      this.setState({ modalLod: true })
      form.resetFields()
      values.nid = this.state.rowData.nid
      handleResponse(applyFix(values), '请求维保', this, null,
        {
          modalLod: false, modalVis: false
        })
    })
  }

  handleTransferClick = (row) => {
    this.setState({
      rowData: Object.assign({}, row),
      modalVis: true,
      modalTitle: '申请资产转移',
      modalLabel: '转移对象 ',
      modalOk: this.handleOkTransfer
    })
  }

  handleOkTransfer = () => {
    const form = this.formRef.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      this.setState({ modalLod: true })
      form.resetFields()
      values.nid = this.state.rowData.nid
      handleResponse(applyTransfer(values), '请求转移', this, null,
        {
          modalLod: false, modalVis: false
        })
    })
  }

  handleReturnClick = (row) => {
    const data = { nid: row.nid }
    handleResponse(applyReturn(data), '请求退库', this, null,
      {
        modalLod: false, modalVis: false
      })
  }

  handleCancel = () => {
    this.setState({
      modalVis: false
    })
  }

  getAsset = async () => {
    const res = await personalAssetList()
    const { data: assets, code } = res.data
    if (code === 200) {
      this.setState({
        assetList: assets
      })
    }
  }

  componentDidMount () {
    this.getAsset()
  }
}

export default connect((state) => state.user)(PersonalAsset)
