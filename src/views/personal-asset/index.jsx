import React from 'react'
import { connect } from 'react-redux'
import HelpCard from '../../components/HelpCard'
import { personalAssetList } from '../../api/asset'
import { Button, Divider, Table } from 'antd'

const Column = Table.Column

class PersonalAsset extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      assetList: [],
      fixModalVis: false, // vis for visible
      fixModalLod: false, // loa for loading
      transferModalVis: false,
      transferModalLod: false,
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
          <Column title="操作" key="action" width={200} align="center" render={(row) => (
            <span>
              <Button type="primary" shape="circle" icon="search" title="申请维保"
                onClick={this.handleFixClick.bind(this, row)}/>
              <Divider type="vertical"/>
              <Button type="primary" shape="circle" icon="edit" title="申请转移"
                onClick={this.handleTransferClick.bind(this, row)}/>
            </span>)}/>
        </Table>
      </div>
    )
  }

  handleFixClick (row) {
    this.setState({
      rowData: Object.assign({}, row),
      fixModalVis: true
    })
  }

  handleTransferClick (row) {
    this.setState({
      rowData: Object.assgin({}, row),
      transferModalVis: true
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
