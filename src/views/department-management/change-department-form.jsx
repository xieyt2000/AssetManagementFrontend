import React, { Component } from 'react'
import { Button, Form, Input, Modal } from 'antd'
import { PropTypes } from 'prop-types'

class ChangeDepartmentForm extends Component {
  render () {
    const { visible, onCancel, onAdd, onDelete,
      onEdit, form, confirmLoading, department } = this.props
    return (
      <Modal title="编辑部门" visible={visible} confirmLoading={confirmLoading}
        onCancel={onCancel}
        footer={[
          <Button key='cancel' onClick={onCancel}>取消</Button>,
          <Button key='delete' type='danger' onClick={onDelete}>删除部门</Button>,
          <Button key='edit' type='primary' onClick={onEdit}>修改名称</Button>,
          <Button key='add' type='primary' onClick={onAdd}>添加新部门</Button>]
        }
      >
        <Form>
          <Form.Item label={'部门名称'}
            extra={'编辑操作将当前部门名称修改为该名称，' +
            '添加操作将为当前部门添加一个名为该名称的附属部门，删除操作将忽略此项（直接删除当前部门）'}>
            {form.getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入部门名称' }],
              initialValue: department.name
            })(<Input placeholder='部门名称'/>)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

ChangeDepartmentForm.propTypes = {
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  onAdd: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  form: PropTypes.object,
  confirmLoading: PropTypes.bool,
  department: PropTypes.object
}

export default Form.create()(ChangeDepartmentForm)
