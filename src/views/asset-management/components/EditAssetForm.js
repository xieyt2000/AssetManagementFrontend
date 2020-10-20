import React, { Component } from 'react'
import { Form, Input, Modal } from 'antd'
import { PropTypes } from 'prop-types'
import RadioGroup from 'antd/es/radio/group'
import { getStatusArr } from './form-shared'

class EditAssetForm extends Component {
  render () {
    const { visible, onCancel, onOk, form, confirmLoading, rowData } = this.props
    const { quantity, value, name, description,
      owner, department, status } = rowData
    // const { name, description } = rowData
    const statusArr = getStatusArr()
    const formLayout = {
      labelCol: { sm: { span: 4 } },
      wrapperCol: { sm: { span: 16 } }
    }
    return (
      <Modal title="编辑资产" visible={visible} onCancel={onCancel}
        onOk={onOk} confirmLoading={confirmLoading}>
        <Form {...formLayout}>
          <Form.Item label={'资产名称'}>
            {form.getFieldDecorator('name', {
              initialValue: name
            })(<Input placeholder='资产名称'/>)}
          </Form.Item>
          <Form.Item label={'资产描述'}>
            {form.getFieldDecorator('description', {
              initialValue: description
            })(<Input placeholder="资产描述"/>)}
          </Form.Item>
          <Form.Item label={'挂账人'}>
            {form.getFieldDecorator('owner', {
              initialValue: owner
            })(<Input placeholder="挂账人"/>)}
          </Form.Item>
          <Form.Item label={'部门'}>
            {form.getFieldDecorator('department', {
              initialValue: department
            })(<Input placeholder="部门"/>)}
          </Form.Item>
          <Form.Item label={'状态'}>
            {form.getFieldDecorator('status', {
              initialValue: status
            })(<RadioGroup options={statusArr}/>)}
          </Form.Item>
          <Form.Item label={'数量'}>
            {form.getFieldDecorator('quantity', {
              initialValue: quantity
            })(<Input placeholder="数量"/>)}
          </Form.Item>
          <Form.Item label={'价值'}>
            {form.getFieldDecorator('value', {
              initialValue: value
            })(<Input placeholder="价值"/>)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

EditAssetForm.propTypes = {
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  confirmLoading: PropTypes.func,
  form: PropTypes.object,
  rowData: PropTypes.object // refer to `rowData` in ../index.js
}

export default Form.create()(EditAssetForm)
