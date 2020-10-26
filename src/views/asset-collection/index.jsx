import React from 'react'
import { connect } from 'react-redux'
import { assetList } from '../../api/asset'
import HelpCard from '../../components/HelpCard'
import { Button, Table } from 'antd'

const Column = Table.Column

class AssetCollection extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      assetList: [],
      rowData: {}
    }
  }

  getAsset = async () => {
    const res = await assetList()
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

  render () {
    const assetList = this.state.assetList
    const description = '作为资产管理员，你可以进行资产管理和批量导入、导出'
    return (
      <div className='app-container'>
        <HelpCard title='资产管理' source={description}/>
        <Table
          bordered rowKey="name"
          dataSource={assetList}
          expandIconColumnIndex={-1}
          pagination={false}>
          <Column title="资产名称" dataIndex="name" key="name" align="center"/>
          <Column title="挂账人" dataIndex="owner" key="owner" align="center"/>
          <Column title="所属部门" dataIndex="department" key="department" align="center"/>
          <Column title="资产类型" dataIndex="is_quantity" key="is_quantity" align="center"
            render={(row) => (
              <span> {row.is_quantity ? '数量型' : '条目型'} </span>
            )}/>
          <Column title="资产状态" dataIndex="status" key="status" align="center"/>
          <Column title="操作" key="action" width={200} align="center" render={(row) => (
            <span>
              <Button type="primary" shape="circle" icon="import" title="领用资产"/>
            </span>)}/>
        </Table>
      </div>
    )
  }
}

export default connect(state => state.user)(AssetCollection)
