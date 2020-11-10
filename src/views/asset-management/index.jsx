import React, { Component } from 'react'
import { Button, Card, Table, Divider, message } from 'antd'
import HelpCard from '../../components/HelpCard'
import UploadAsset from './upload'
import AssetInfo from './components/AssetInfo'
import EditAssetForm from './components/EditAssetForm'
import RetireAssetForm from './components/RetireAssetForm'
import {
  addAsset,
  assetList,
  editAsset,
  getAssetHistory,
  assetQuery,
  assetRetire,
  getCustomProp
} from '../../api/asset'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import AddAssetForm from './components/AddAssetForm'
import HistoryTable from './components/HistoryTable'
import { handleResponse } from '../../utils/response'
import QueryPanel from './components/QueryPanel'
import { renderChineseStatus, getAssetCategories } from '../../utils/asset'
import { putCustom } from './components/form-shared'
import { getList } from '../../utils/list'

const Column = Table.Column

class AssetManagement extends Component {
  constructor (props) {
    super(props)
    this.state = {
      assetList: [],
      editModalVis: false, // vis for visible
      editModalLod: false, // loa for loading
      rowData: {},
      addModalVis: false,
      addModalLod: false,
      assetInfoModelVis: false,
      assetInfoModelLod: false,
      assetCategoryList: [],
      historyModalVis: false,
      historyModalLod: false,
      curAssetHistoryList: [],
      retireModalVis: false,
      retireModalLod: false,
      customPropList: []
    }
  }

  render () {
    const assetList = this.state.assetList

    const cardTitle = (
      <span>
        <Button type='primary' onClick={this.handleClickAdd}>添加资产</Button>
        <Divider type='vertical'/>
        <UploadAsset uploadSuccess={this.handleExcelUpload}/>
      </span>
    )
    const description = '作为资产管理员，你可以进行资产管理和批量导入、导出'
    return (
      <div className='app-container'>
        <HelpCard title='资产管理' source={description}/>
        <br/>
        <QueryPanel
          submitQuery={this.submitQuery}
          assetCategories={this.state.assetCategoryList}
          customProps={this.state.customPropList}
        />
        <br/>
        <Card title={cardTitle}>
          <Table
            bordered rowKey="name"
            dataSource={assetList}
            expandIconColumnIndex={-1}
            pagination={false}>
            <Column title="资产id" dataIndex="nid" key="nid" align="center"/>
            <Column title="资产名称" dataIndex="name" key="name" align="center"/>
            <Column title="挂账人" dataIndex="owner" key="owner" align="center"/>
            <Column title="所属部门" dataIndex="department" key="department" align="center"/>
            <Column title="资产分类" dataIndex="category" key="category" align="center"/>
            <Column title="资产状态" dataIndex="status" key="status" align="center"
              render={renderChineseStatus}/>
            <Column title="操作" key="action" width={200} align="center" render={(row) => (
              <span>
                <Button type="primary" shape="circle" icon="search" title="查看详情" size='small'
                  onClick={this.handleAssetInfoClick.bind(this, row)}/>
                <Divider type="vertical"/>
                <Button type="primary" shape="circle" icon="edit" title="编辑" size='small'
                  onClick={this.handleEditAssetFormClick.bind(this, row)}/>
                <Divider type="vertical"/>
                <Button type="primary" shape="circle" icon="history" title="历史" size='small'
                  onClick={this.handleHistoryClick.bind(this, row)}/>
                <Divider type="vertical"/>
                <Button type="primary" shape="circle" icon="close" title="清退" size='small'
                  onClick={this.handleRetireClick.bind(this, row)}/>
              </span>)}/>
          </Table>
        </Card>
        <AssetInfo
          rowData={this.state.rowData}
          wrappedComponentRef={(formRef) => {
            this.assetInfoRef = formRef
          }}
          visible={this.state.assetInfoModelVis}
          conirmLoading={this.state.assetInfoModelLod}
          onExit={this.handleAssetInfoExit}
        />
        <EditAssetForm
          rowData={this.state.rowData}
          wrappedComponentRef={(formRef) => {
            this.editFormRef = formRef
          }}
          visible={this.state.editModalVis}
          conirmLoading={this.state.editModalLod}
          onCancel={this.handleCancel}
          onOk={this.handleOkEdit}
          customPropList={this.state.customPropList}
        />
        <HistoryTable
          visible={this.state.historyModalVis}
          loading={this.state.historyModalLod}
          onCancel={this.handleCancel}
          history={this.state.curAssetHistoryList}
        />
        <AddAssetForm
          wrappedComponentRef={(formRef) => {
            this.addFormRef = formRef
          }}
          visible={this.state.addModalVis}
          confirmLoading={this.state.addModalLod}
          onCancel={this.handleCancel}
          onOk={this.handleOkAdd}
          assetCategories={this.state.assetCategoryList}
          customPropList={this.state.customPropList}
        />
        <RetireAssetForm
          wrappedComponentRef={(formRef) => {
            this.retireFormRef = formRef
          }}
          visible={this.state.retireModalVis}
          conirmLoading={this.state.retireModalLod}
          onCancel={this.handleCancel}
          onOk={this.handleOkRetire}
        />
      </div>
    )
  }

  submitQuery = async (query) => {
    // const info = query.name + '+' + query.category + '+' + query.description
    const res = await assetQuery(query)
    const { data: assets, code } = res.data
    if (code === 200) {
      message.success('查询成功')
      this.setState({
        assetList: assets
      })
    } else {
      message.error('查询失败')
    }
  }

  localAddAsset (assetArr) {
    addAsset(assetArr).then((res) => {
      if (res.data.code === 200) {
        message.success('添加成功')
      } else {
        message.error('添加失败，' + res.data.message)
      }
      this.getAsset()
      this.getAssetCategories()
    }).catch((ignored) => {
      message.error('添加失败，请检查网络连接后重试！')
    }).finally(() => {
      this.setState({ addModalVis: false, addModalLod: false })
    })
  }

  handleExcelUpload = (results) => {
    this.localAddAsset(results)
  }

  handleAssetInfoClick = (row) => {
    this.setState({
      rowData: Object.assign({}, row),
      assetInfoModelVis: true
    })
  }

  handleAssetInfoExit = () => {
    this.setState({
      assetInfoModelVis: false
    })
  }

  handleEditAssetFormClick = (row) => {
    this.setState({
      rowData: Object.assign({}, row),
      editModalVis: true
    })
  }

  handleHistoryClick = (row) => {
    this.setState({
      historyModalVis: true,
      historyModalLod: true
    })
    handleResponse(getAssetHistory(row), '获取历史', this, 'curAssetHistoryList',
      {
        historyModalLod: false
      })
  }

  handleRetireClick = (row) => {
    this.setState({
      rowData: Object.assign({}, row),
      retireModalVis: true
    })
  }

  handleOkRetire = (ignore) => {
    const form = this.retireFormRef.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      values.nid = this.state.rowData.nid
      this.setState({ addModalLod: true })
      form.resetFields()
      handleResponse(assetRetire(values), '清退资产', this, null,
        { retireModalVis: false, retireModalLod: false }, null, this.getAsset())
    })
  }

  handleOkEdit = (ignore) => {
    const form = this.editFormRef.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      this.setState({ editModalLod: true })
      values.nid = this.state.rowData.nid
      editAsset(putCustom(values, this.state.customPropList)).then((res) => {
        form.resetFields()
        this.setState({ editModalVis: false, editModalLod: false })
        if (res.data.code === 200) {
          message.success('编辑成功！')
        } else {
          message.error('编辑失败，' + res.data.message)
        }
        this.getAsset()
      }).catch((ignored) => {
        message.error('编辑失败，请检查网络连接后重试！')
      })
    })
  }

  handleCancel = (ignore) => {
    this.setState({
      editModalVis: false,
      addModalVis: false,
      historyModalVis: false,
      retireModalVis: false
    })
  }

  handleClickAdd = () => {
    this.setState({
      addModalVis: true
    })
  }

  handleOkAdd = (ignore) => {
    const form = this.addFormRef.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      this.setState({ addModalLod: true })
      form.resetFields()
      this.localAddAsset([putCustom(values, this.state.customPropList)])
    })
  }

  getAsset = () => {
    getList(assetList, this, 'assetList')
  }

  localGetCustomProp = async () => {
    const res = await getCustomProp()
    if (res.data.code === 200) {
      this.setState({
        customPropList: res.data.data
      })
    }
  }

  componentDidMount () {
    this.getAsset()
    getAssetCategories(this)
    this.localGetCustomProp()
  }
}

AssetManagement.propTypes = {
  name: PropTypes.string
}

export default connect((state) => state.user)(AssetManagement)
