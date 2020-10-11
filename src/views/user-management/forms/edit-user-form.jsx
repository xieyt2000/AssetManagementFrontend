import React, { Component } from 'react'
import { getRoleArr, formLayout } from './form-shared'
import { Checkbox, Form, Input, Modal } from 'antd'
import { PropTypes } from 'prop-types'

class EditUserForm extends Component {
  render () {
    const { visible, onCancel, onOk, form, confirmLoading, rowData } = this.props
    const { name, department, role } = rowData
    const rolesArr = getRoleArr()
    return (
      <Modal title="编辑用户" visible={visible} onCancel={onCancel}
        onOk={onOk} confirmLoading={confirmLoading}>
        <Form {...formLayout}>
          <Form.Item label={'用户名'}>
            {form.getFieldDecorator('name', {
              initialValue: name
            })(<Input disabled/>)}
          </Form.Item>
          <Form.Item label={'密码'}>
            {form.getFieldDecorator('password', {
              rules: [{ required: true, validator: this.validatePassWord }]
            })(<Input.Password placeholder="密码"/>)}
          </Form.Item>
          <Form.Item label={'权限'}>
            {form.getFieldDecorator('role', { initialValue: role })(<Checkbox.Group
              options={rolesArr}/>)}
          </Form.Item>
          <Form.Item label={'部门'}>
            {/* TODO 部门选择方式、验证 */}
            {form.getFieldDecorator('department', {
              initialValue: department
            })(<Input placeholder="部门"/>)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

EditUserForm.propTypes = {
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  confirmLoading: PropTypes.func,
  form: PropTypes.instanceOf(Form),
  rowData: PropTypes.object // refer to `rowData` in ../index.js
}

export default Form.create()(EditUserForm)
