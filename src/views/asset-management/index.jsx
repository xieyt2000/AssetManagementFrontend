import React, { Component } from 'react'
import { Button, Card, Table, Divider } from 'antd'
import HelpCard from '../../components/HelpCard'

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
      addModalLod: false
    }
  }

  render () {
    const assetList = this.state.assetList
    const cardTitle = (
      <span>
        <Button type='primary' onClick={this.handleAdd}>导入资产</Button>
        <Divider type='vertical'/>
        <Button type='primary' onClick={this.handleAdd}>批量导入</Button>
        <Divider type='vertical'/>
        <Button type='primary' onClick={this.handleAdd}>批量导出</Button>
      </span>
    )
    const description = '作为资产管理员，你可以进行资产管理和批量导入、导出'
    return (
      <div className='app-container'>
        <HelpCard title='资产管理' source={description}/>
        <Card title={cardTitle}>
          <Table
            bordered rowKey="name"
            dataSource={assetList}
            pagination={true}>
            <Column title="资产名称" dataIndex="name" key="name" align="center"/>
            <Column title="挂账人" dataIndex="owner" key="owner" align="center"/>
            <Column title="所属部门" dataIndex="department" key="department" align="center"/>
            <Column title="操作" key="action" width={200} align="center" render={(row) => (
              <span>
                <Button type="primary" shape="circle" icon="search" title="查看详情"/>
                <Divider type="vertical"/>
                <Button type="primary" shape="circle" icon="edit" title="编辑"/>
              </span>)}/>
          </Table>
        </Card>
      </div>
    )
  }

  handleAdd () {

  }

  localGetAsset () {
  }

  componentDidMount () {
    this.localGetAsset()
  }
}

export default AssetManagement
