import React from 'react'
import { Table, Button, TreeSelect, message } from 'antd'
import { getDepartments } from '../../utils/department'
import { handleResponse } from '../../utils/response'
import { assetAllocationList, assetAllocate } from '../../api/asset'
import { renderAssetType, renderChineseStatus } from '../../utils/asset'

const columns = [
  {
    title: '资产名称',
    dataIndex: 'name'
  },
  {
    title: '挂账人',
    dataIndex: 'owner'
  },
  {
    title: '所属部门',
    dataIndex: 'category'
  },
  {
    title: '资产类型',
    render: renderAssetType
  },
  {
    title: '资产状态',
    dataIndex: 'status',
    render: renderChineseStatus
  }
]

class AssetAllocation extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      assetList: [],
      departmentList: [],
      dataSource: []
    }
  }

  componentDidMount () {
    getDepartments(this)
    this.setState({
      assetList: []
    })
  }

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.setState({ selectedRowKeys })
  };

  handleTreeSelect = async (value) => {
    const data = { id: value }
    assetAllocationList(data)
      .then((res) => {
        if (res.data.code === 200) {
          const tmpData = []
          for (let i = 0; i < res.data.data.length; i++) {
            tmpData.push(res.data.data[i])
            tmpData[i].key = tmpData[i].nid
            delete tmpData[i].children
          }
          this.setState({
            dataSource: tmpData
          })
          message.success('获取资产成功')
        } else {
          message.error('获取资产失败' + res.data.message)
        }
      })
      .catch(() => {
        message.error('获取资产失败，请检查网络连接后重试！')
      })
  }

  handleAllocationClick = () => {
    const data = { idList: this.state.selectedRowKeys }
    handleResponse(assetAllocate(data), '调拨')
  }

  render () {
    const { loading, selectedRowKeys, departmentList, dataSource } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    }
    const hasSelected = selectedRowKeys.length > 0

    return (
      <div className='app-container'>
        <div style={{ marginBottom: 16 }}>
          <TreeSelect
            onSelect={this.handleTreeSelect}
            treeData={departmentList}
          />
          <Button type="primary" onClick={this.handleAllocationClick}
            disabled={!hasSelected} loading={loading}>
              调拨
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table rowSelection={rowSelection} columns={columns}
          dataSource={dataSource} pagination={false}/>
      </div>
    )
  }
}
export default AssetAllocation
