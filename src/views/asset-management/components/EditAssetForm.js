import React, { Component } from 'react'
import { Form, Input, Modal } from 'antd'
import { PropTypes } from 'prop-types'
import { parent } from './sharedFormItem'

class EditAssetForm extends Component {
  render () {
    const { visible, onCancel, onOk, form, confirmLoading, rowData } = this.props
    const { name, description, parent_id: parentID } = rowData
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
          {parent(form, parentID)}
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
