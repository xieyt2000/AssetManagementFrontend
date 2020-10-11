import React, { Component } from 'react'
import { Checkbox, Form, Input, Modal } from 'antd'
import { PropTypes } from 'prop-types'
import { nameExist } from '@/api/user'
import { getRoleArr, formLayout } from './form-shared'

class AddUserForm extends Component {
  validateNewName = async (rule, name, callback) => {
    if (name) {
      if (!/^[a-zA-Z0-9]{4,20}$/.test(name)) {
        callback('用户名必须为4-20位数字或字母组合')
      }
      const response = await nameExist(name)
      const exist = response.data.exist
      if (exist) {
        callback('用户名已存在')
      }
    } else {
      callback('请输入用户名')
    }
    callback()
  }

  validatePassWord = (rule, password, callback) => {
    if (password) {
      if (!/^[a-zA-Z0-9]{4,20}$/.test(password)) {
        callback('密码必须为4-20位数字或字母组合')
      }
    } else {
      callback('请输入密码')
    }
    callback()
  }

  render () {
    const { visible, onCancel, onOk, form, confirmLoading } = this.props
    const rolesArr = getRoleArr()
    return (
      <Modal title="添加用户" visible={visible} onCancel={onCancel}
        onOk={onOk} confirmLoading={confirmLoading}>
        <Form {...formLayout}>
          <Form.Item label={'用户名'}>
            {form.getFieldDecorator('name', {
              rules: [{ required: true, validator: this.validateNewName }]
            })(<Input placeholder="用户名"/>)}
          </Form.Item>
          <Form.Item label={'密码'}>
            {form.getFieldDecorator('password', {
              rules: [{ required: true, validator: this.validatePassWord }]
            })(<Input.Password placeholder="密码"/>)}
          </Form.Item>
          <Form.Item label={'权限'}>
            {form.getFieldDecorator('role')(<Checkbox.Group options={rolesArr}/>)}
          </Form.Item>
          <Form.Item label={'部门'}>
            {/* TODO 部门选择方式、验证 */}
            {form.getFieldDecorator('department')(<Input placeholder="部门"/>)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

AddUserForm.propTypes = {
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  confirmLoading: PropTypes.func,
  form: PropTypes.instanceOf(Form)
}

export default Form.create()(AddUserForm)
