import React from 'react'
import { connect } from 'react-redux'
import HelpCard from '../../components/HelpCard'
import { personalAssetList } from '../../api/asset'
import { Button, Card, Divider, Modal, Table } from 'antd'
import InputForm from './components/InputForm'
import { handleResponse } from '@/utils/response'
import { applyFix, applyTransfer, applyReturn } from '@/api/issue'
import { CHINESE_STATUS } from '../../utils/asset'
import { getList } from '../../utils/list'
import { deleteColor, disableColor, editColor, searchColor } from '../../utils/style'
import { getColumnSearchProps } from '../../utils/table'
import AssetInfo from '../asset-management/components/AssetInfo'

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
      rowData: {},
      returnModalVis: false,
      returnModalLod: false,
      infoModalVis: false,
      searchText: '',
      searchedColumn: ''
    }
  }

  render () {
    const description = '作为企业员工，你可以查看你使用中的资产，并且可以向相关负责人申请维保、转移、退库'
    const assetList = this.state.assetList

    return (
      <div className='app-container'>
        <HelpCard title='个人资产' source={description}/>
        <br/>
        <Card>
          <Table
            bordered rowKey="name"
            dataSource={assetList}
            expandIconColumnIndex={-1}
            pagination={false}>
            <Column title="资产id" dataIndex="nid" key="nid" align="center"
              {...getColumnSearchProps('nid', this, '资产id')}/>
            <Column title="资产名称" dataIndex="name" key="name" align="center"
              {...getColumnSearchProps('name', this, '资产名称')}/>
            <Column title="资产分类" dataIndex="category" key="category" align="center"
              {...getColumnSearchProps('category', this, '资产分类')}/>
            <Column title="操作" key="action" width={300} align="center" render={(row) => (
              <span>
                <Button type="primary" shape="circle" icon="search" title="查看详情"
                  style={searchColor} onClick={this.handleInfoClick.bind(this, row)}/>
                <Divider type="vertical"/>
                <Button type="primary" shape="circle" icon="tool" title="申请维保"
                  style={disableColor} onClick={this.handleFixClick.bind(this, row)}/>
                <Divider type="vertical"/>
                <Button type="primary" shape="circle" icon="swap" title="申请转移"
                  style={editColor} onClick={this.handleTransferClick.bind(this, row)}/>
                <Divider type="vertical"/>
                <Button type="primary" shape="circle" icon="poweroff" title="申请退库"
                  style={deleteColor} onClick={this.handleReturnClick.bind(this, row)}/>
              </span>)}/>
          </Table>
        </Card>
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
        <Modal
          title="资产退库"
          visible={this.state.returnModalVis}
          confirmLoading={this.state.returnModalLod}
          onOk={this.handleReturnOk}
          onCancel={this.handleCancel}
        >
          <p>是否申请退库资产 {this.state.rowData.name} ?</p>
        </Modal>
        <AssetInfo
          rowData={this.state.rowData}
          visible={this.state.infoModalVis}
          onExit={this.handleInfoExit}
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

  handleInfoClick =(row) => {
    this.setState({
      rowData: Object.assign({}, row),
      infoModalVis: true
    })
  }

  handleInfoExit = () => {
    this.setState({
      infoModalVis: false
    })
  }

  handleOkForm = (form, apply, operation) => {
    // operation:str 操作名称
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      this.setState({ modalLod: true })
      form.resetFields()
      values.nid = this.state.rowData.nid
      handleResponse(apply(values), operation, this, null,
        {
          modalLod: false, modalVis: false
        }, null, this.getAsset)
    })
  }

  handleOkFix = () => {
    this.handleOkForm(this.formRef.props.form, applyFix, '请求维保')
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
    this.handleOkForm(this.formRef.props.form, applyTransfer, '请求转移')
  }

  handleReturnClick = (row) => {
    this.setState({
      rowData: Object.assign({}, row),
      returnModalVis: true
    })
  }

  handleReturnOk = () => {
    const data = { nid: this.state.rowData.nid }
    handleResponse(applyReturn(data), '请求退库', this, null,
      {
        returnModalLod: false, returnModalVis: false
      }, null, this.getAsset)
  }

  handleCancel = () => {
    this.setState({
      modalVis: false,
      returnModalVis: false
    })
  }

  getAsset = async () => {
    await getList(personalAssetList, this, 'assetList')
  }

  componentDidMount () {
    this.getAsset()
  }
}

export default connect((state) => state.user)(PersonalAsset)
