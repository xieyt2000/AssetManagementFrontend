import React, { Component } from 'react'
import { Form, Radio, Modal } from 'antd'
import { PropTypes } from 'prop-types'
class RetireAssetForm extends Component {
  render () {
    const { visible, onCancel, onOk, form, confirmLoading } = this.props
    const typeArr = [{ label: '是', value: true }, { label: '否', value: false }]
    const formLayout = {
      labelCol: { sm: { span: 12 } },
      wrapperCol: { sm: { span: 6 } }
    }
    return (
      <Modal title="清退资产" visible={visible} onCancel={onCancel}
        onOk={onOk} confirmLoading={confirmLoading}>
        <Form {...formLayout}>
          <Form.Item label={'是否同时清退关联的父子资产'}>
            {form.getFieldDecorator('retire_family', {
              rules: [{ required: true, message: '请选择' }]
            })(<Radio.Group options={typeArr}/>)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
RetireAssetForm.propTypes = {
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  confirmLoading: PropTypes.func,
  form: PropTypes.object
}

export default Form.create()(RetireAssetForm)
