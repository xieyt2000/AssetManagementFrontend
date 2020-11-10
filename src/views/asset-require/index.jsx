import React from 'react'
import { connect } from 'react-redux'
import HelpCard from '../../components/HelpCard'
import { Button, Card, Form, Input, TreeSelect } from 'antd'
import { getAssetCategories } from '../../utils/asset'

import { PropTypes } from 'prop-types'
import { assetRequire } from '../../api/asset'
import { handleResponse } from '../../utils/response'

class AssetRequire extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      assetCategoryList: []
    }
  }

  componentDidMount () {
    getAssetCategories(this)
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { category } = values
        let { reason } = values
        if (!reason) {
          reason = '无'
        }
        console.log(category, reason)
        handleResponse(assetRequire({ category: category, reason: reason }), '领用', this, null, null,
          () => {
            this.props.form.resetFields()
          })
      }
    })
  }

  render () {
    const description = '作为企业员工，你可以在这里提出领用资产申请'
    const { getFieldDecorator } = this.props.form
    const assetCategories = this.state.assetCategoryList
    return (
      <div className='app-container'>
        <HelpCard title='资产领用' source={description}/>
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
