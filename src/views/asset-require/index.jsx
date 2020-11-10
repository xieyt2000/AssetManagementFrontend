import React from 'react'
import { connect } from 'react-redux'
import { applyRequire } from '@/api/issue'
import HelpCard from '../../components/HelpCard'
import { Button, Card, Form, Input, TreeSelect } from 'antd'
import { getAssetCategories } from '../../utils/asset'
import { handleResponse } from '@/utils/response'
import { PropTypes } from 'prop-types'

class AssetRequire extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      assetCategoryList: [],
      chosenCategory: ''
    }
  }

  componentDidMount () {
    getAssetCategories(this)
  }

  handleClickCollect = (row) => {
    this.setState({
      rowData: Object.assign({}, row),
      collectModalVis: true
    })
  }

  handleOk = (ignore) => {
    const data = { nid: this.state.rowData.nid }

    handleResponse(applyRequire(data), '请求领用', this, null,
      {
        collectModalLod: false, collectModalVis: false
      }, null, this.getAsset)
  }

  handleCancel = (ignore) => {
    this.setState({
      collectModalVis: false
    })
  }

  render () {
    const description = '作为企业员工，你可以在这里提出领用资产申请'
    const { getFieldDecorator } = this.props.form
    const assetCategories = this.state.assetCategoryList
    return (
      <div className='app-container'>
        <HelpCard title='资产管理' source={description}/>
        <br/>
        <Card>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item label={'资产分类'}>
              {getFieldDecorator('category', {
                rules: [{ required: true, message: '分类不能为空' }]
              })(<TreeSelect
                treeData={assetCategories}
              />)}
            </Form.Item>
            <Form.Item label={'申请理由'}>
              {getFieldDecorator('reason')(<Input placeholder="申请理由"/>)}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType='submit'>
                提交
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
}

AssetRequire.propTypes = {
  form: PropTypes.object
}

export default connect(state => state.user)(Form.create()(AssetRequire))
