import React from 'react'
import { Table, Button, TreeSelect } from 'antd'
import { getDepartments } from '../../utils/department'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address'
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
    console.log(value)
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
              Reload
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
