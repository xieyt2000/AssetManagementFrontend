import { Button, Modal, Table } from 'antd'
import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import AssetInfo from '../asset-management/components/AssetInfo'

const Column = Table.Column

class RequireModal extends Component {
  state = {
    rowData: {},
    assetInfoModelVis: false
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

  render () {
    const { assetList, visible, loading, onCancel, confirmLoading } = this.props

    return (
      <div>
        <Modal title='领用审批' visible={visible} onCancel={onCancel} confirmLoading={confirmLoading}
          width='70%'>
          <Table
            bordered
            rowKey='nid'
            dataSource={assetList}
            pagination={false}
            loading={loading}
            childrenColumnName='tableChild' // ignore
          >
            <Column title="资产id" dataIndex="nid" key="nid" align="center"/>
            <Column title="资产名称" dataIndex="name" key="name" align="center"/>
            <Column title="详情" key="action" align="center" render={(row) => (
              <span>
                <Button type="primary" shape="circle" icon="search" title="查看详情"
                  onClick={this.handleAssetInfoClick.bind(this, row)}/>
              </span>)}/>
          </Table>
        </Modal>
        <AssetInfo
          rowData={this.state.rowData}
          visible={this.state.assetInfoModelVis}
          onExit={this.handleAssetInfoExit}
        />
      </div>
    )
  }
}

RequireModal.propTypes = {
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  loading: PropTypes.bool,
  assetList: PropTypes.array,
  confirmLoading: PropTypes.bool
}

export default RequireModal
