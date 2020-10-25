import React, { Component } from 'react'
import { getRoleArr, formLayout } from './form-shared'
import { Checkbox, Collapse, Form, Input, Modal, TreeSelect } from 'antd'
import { PropTypes } from 'prop-types'

const Panel = Collapse.Panel

class EditUserForm extends Component {
  validatePassWord = (rule, password, callback) => {
    if (password && !/^[a-zA-Z0-9]{4,20}$/.test(password)) {
      callback('密码必须为4-20位数字或字母组合（如果不修改密码请清空该输入框）')
    }
    callback()
  }

  render () {
    const { visible, onCancel, onOk, form, confirmLoading, rowData, departments } = this.props
    const { name, role } = rowData
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
          <Form.Item label={'权限'}>
            {form.getFieldDecorator('role', { initialValue: role })(<Checkbox.Group
              options={rolesArr}/>)}
          </Form.Item>
          <Form.Item label={'部门'}>
            {/* TODO 部门选择方式、验证 */}
            {form.getFieldDecorator('department', {
              required: true, message: '部门不能为空'
            })(<TreeSelect
              treeData={departments}
            />)}
          </Form.Item>
          <center>
            <Collapse style={{
              width: '65%'
            }}>
              <Panel key={1} header={'修改密码（仅在修改密码时设置）'}>
                <Form.Item label={''}>
                  {form.getFieldDecorator('password', {
                    rules: [{ validator: this.validatePassWord }]
                  })(<Input.Password placeholder="密码"/>)}
                </Form.Item>
              </Panel>
            </Collapse>
          </center>
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
  form: PropTypes.object,
  rowData: PropTypes.object, // refer to `rowData` in ../index.js
  departments: PropTypes.array
}

export default Form.create()(EditUserForm)
