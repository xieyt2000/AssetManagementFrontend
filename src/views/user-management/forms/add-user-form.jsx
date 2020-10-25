import React, { Component } from 'react'
import { Checkbox, Form, Input, Modal, TreeSelect } from 'antd'
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

  render () {
    const { visible, onCancel, onOk, form, confirmLoading, departments } = this.props
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
          <Form.Item label={'权限'}>
            {form.getFieldDecorator('role')(<Checkbox.Group options={rolesArr}/>)}
          </Form.Item>
          <Form.Item label={'部门'}>
            {form.getFieldDecorator('department', {
              rules: [{ required: true, message: '部门不能为空' }]
            })(<TreeSelect
              treeData={departments}
            />)}
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
  confirmLoading: PropTypes.bool,
  form: PropTypes.object,
  departments: PropTypes.array
}

export default Form.create()(AddUserForm)
