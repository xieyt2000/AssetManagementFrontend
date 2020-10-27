import React, { Component } from 'react'
import { Form, Input, Modal, TreeSelect, Radio } from 'antd'
import { PropTypes } from 'prop-types'
import { formLayout } from './form-shared'

const typeArr = [{ label: '数量型', value: 'AMOUNT' }, { label: '条目型', value: 'ITEM' }]

class AddAssetForm extends Component {
  // validateNewName = async (rule, name, callback) => {
  //   if (name) {
  //     if (!/^[a-zA-Z0-9]{4,20}$/.test(name)) {
  //       callback('用户名必须为4-20位数字或字母组合')
  //     }
  //     const response = await nameExist(name)
  //     const exist = response.data.exist
  //     if (exist) {
  //       callback('用户名已存在')
  //     }
  //   } else {
  //     callback('请输入用户名')
  //   }
  //   callback()
  // }

  render () {
    const { visible, onCancel, onOk, form, confirmLoading, assetCategories } = this.props
    return (
      <Modal title="添加资产" visible={visible} onCancel={onCancel}
        onOk={onOk} confirmLoading={confirmLoading}>
        <Form {...formLayout}>
          <Form.Item label={'资产名称'}>
            {form.getFieldDecorator('name', {
              rules: [{ required: true, message: '资产名称不能为空' }]
            })(<Input placeholder="资产名称"/>)}
          </Form.Item>
          <Form.Item label={'资产描述'}>
            {form.getFieldDecorator('description')(<Input placeholder="资产描述"/>)}
          </Form.Item>
          <Form.Item label={'资产类型'}>
            {form.getFieldDecorator('type_name', {
              rules: [{ required: true, message: '资产名称不能为空' }]
            })(<Radio.Group options={typeArr}/>)}
          </Form.Item>
          <Form.Item label={'资产数量'}>
            {form.getFieldDecorator('quantity', {
              rules: [{ required: true, message: '资产数量不能为空' }]
            })(<Input placeholder="资产数量"/>)}
          </Form.Item>
          <Form.Item label={'资产价值'}>
            {form.getFieldDecorator('value', {
              rules: [{ required: true, message: '资产价值不能为空' }]
            })(<Input placeholder="资产价值"/>)}
          </Form.Item>
          <Form.Item label={'资产分类'}>
            {form.getFieldDecorator('category', {
              rules: [{ required: true, message: '部门不能为空' }]
            })(<TreeSelect
              treeData={assetCategories}
            />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

AddAssetForm.propTypes = {
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  confirmLoading: PropTypes.bool,
  form: PropTypes.object,
  assetCategories: PropTypes.array
}

export default Form.create()(AddAssetForm)
