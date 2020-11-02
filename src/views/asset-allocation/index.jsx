import React from 'react'
import { Table, Button, TreeSelect } from 'antd'
import { getDepartments } from '../../utils/department'
import { handleResponse } from '../../utils/response'
import { assetAllocationList } from '../../api/asset'
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
      departmentList: []
    }
  }

  componentDidMount () {
    getDepartments(this)
  }

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.setState({ selectedRowKeys })
  };

  handleTreeSelect = (value) => {
    const data = { id: value }
    handleResponse(assetAllocationList(data), '获取资产', this, 'assetList'
      , null, null, null)
    const tmpAssetList = this.state.assetList
    tmpAssetList.forEach(item => {
      item.key = item.nid
    })
    this.setState({
      assetList: tmpAssetList
    })
  }

  render () {
    const { loading, selectedRowKeys, assetList, departmentList } = this.state
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
          <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}>
              调拨
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={assetList} />
      </div>
    )
  }
}
export default AssetAllocation
