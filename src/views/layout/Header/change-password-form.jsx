import React, { Component } from 'react'
import { Form, Input, Modal } from 'antd'
import { bool, PropTypes } from 'prop-types'

class ChangePasswordForm extends Component {
  validatePasswordSyntax = (rule, password, callback) => {
    if (password && !/^[a-zA-Z0-9]{4,20}$/.test(password)) {
      callback('密码必须为4-20位数字或字母组合')
    }
    callback()
  }

  validatePasswordSame = (rule, value, callback) => {
    const { form } = this.props
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('两次输入密码不一致')
    }
    callback()
  }

  render () {
    const { visible, onCancel, onOk, form, confirmLoading } = this.props
    return (
      <Modal title="修改密码" visible={visible} onCancel={onCancel}
        onOk={onOk} confirmLoading={confirmLoading}>
        <Form>
          <Form.Item label={'当前密码'}>
            {form.getFieldDecorator('oldPassword', {
              rules: [{ required: true, message: '请输入当前密码' }]
            })(<Input.Password placeholder='当前密码'/>)}
          </Form.Item>
          <Form.Item label={'新密码'}>
            {form.getFieldDecorator('newPassword', {
              rules: [{
                required: true,
                message: '请输入新密码'
              }, { validator: this.validatePasswordSyntax }]
            })(<Input.Password placeholder='新密码'/>)}
          </Form.Item>
          <Form.Item label={'重复新密码'}>
            {form.getFieldDecorator('confirmPassword', {
              rules: [{
                required: true,
                message: '请确认新密码'
              }, { validator: this.validatePasswordSame }]
            })(<Input.Password placeholder='确认新密码'/>)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

ChangePasswordForm.propTypes = {
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  form: PropTypes.object,
  confirmLoading: bool
}

export default Form.create()(ChangePasswordForm)
