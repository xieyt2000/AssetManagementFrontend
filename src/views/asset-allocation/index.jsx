import React from 'react'
import { Table, Button, TreeSelect, message, Card, Divider } from 'antd'
import { getDepartments } from '../../utils/department'
import { assetAllocate, availableAssetList } from '../../api/asset'
import HelpCard from '../../components/HelpCard'
import { getColumnSearchProps } from '../../utils/table'

class AssetAllocation extends React.Component {
    columns = [
      {
        title: '资产名称',
        dataIndex: 'name',
        align: 'center',
        ...getColumnSearchProps('name', this, '名称')
      },
      {
        title: '挂账人',
        dataIndex: 'owner',
        align: 'center',
        ...getColumnSearchProps('owner', this, '挂账人')
      },
      {
        title: '所属部门',
        dataIndex: 'department',
        align: 'center',
        ...getColumnSearchProps('department', this, '部门')
      },
      {
        title: '资产分类',
        dataIndex: 'category',
        align: 'center',
        ...getColumnSearchProps('category', this, '分类')
      }
    ]

    constructor (props) {
      super(props)
      this.state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        departmentList: [],
        dataSource: [],
        searchText: '',
        searchedColumn: ''
      }
    }

    componentDidMount () {
      getDepartments(this)
      this.getAssetList()
    }

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.setState({ selectedRowKeys })
  };

  getAssetList = () => {
    availableAssetList()
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
          // message.success('获取资产成功')
        } else {
          message.error('获取资产失败' + res.data.message)
        }
      })
      .catch(() => {
        message.error('获取资产失败，请检查网络连接后重试！')
      })
  }

  handleTreeSelect = (value) => {
    this.departmentId = value
  }

  handleAllocationClick = () => {
    this.setState({ loading: true })
    const data = { idList: this.state.selectedRowKeys, id: this.departmentId }
    assetAllocate(data)
      .then((res) => {
        if (res.data.code === 200) {
          message.success('调拨资产成功')
        } else {
          message.error('调拨资产失败,' + res.data.message)
        }
      })
      .catch(() => {
        message.error('调拨资产失败,请检查网络连接后重试！')
      })
      .finally(async () => {
        this.setState({ loading: false, selectedRowKeys: [] })
        this.getAssetList()
      })
  }

  render () {
    const { loading, selectedRowKeys, departmentList, dataSource } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    }
    const hasSelected = selectedRowKeys.length > 0
    const description = '作为资产管理员，你可以进行资产的批量调拨'
    return (
      <div className='app-container'>
        <div style={{ marginBottom: 16 }}>
          <HelpCard title='资产调拨' source={description}/>
          <br/>
          <Card>
            <TreeSelect
              onSelect={this.handleTreeSelect}
              treeData={departmentList}
              style={{ width: '200px' }}
            />
            <Divider type='vertical'/>
            <Button type="primary" onClick={this.handleAllocationClick}
              disabled={!hasSelected} loading={loading}>
              调拨
            </Button>

            <span style={{ marginLeft: 8 }}>
              {hasSelected ? `您一共选择了 ${selectedRowKeys.length} 项` : ''}
            </span>
          </Card>
        </div>
        <Card>
          <Table rowSelection={rowSelection} columns={this.columns}
            dataSource={dataSource} pagination={false}
            bordered />
        </Card>
      </div>
    )
  }
}
export default AssetAllocation
