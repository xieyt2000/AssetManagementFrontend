import React, { Component } from 'react'
import { Button, Form, Input, Modal } from 'antd'
import { PropTypes } from 'prop-types'

class ChangeCategoryForm extends Component {
  render () {
    const { visible, onCancel, onAdd, onDelete,
      onEdit, form, confirmLoading, category } = this.props
    return (
      <Modal title="编辑分类" visible={visible} confirmLoading={confirmLoading}
        onCancel={onCancel}
        footer={[
          <Button key='cancel' onClick={onCancel}>取消</Button>,
          <Button key='delete' type='danger' onClick={onDelete}>删除分类</Button>,
          <Button key='edit' type='primary' onClick={onEdit}>修改名称</Button>,
          <Button key='add' type='primary' onClick={onAdd}>添加新分类</Button>]
        }
      >
        <Form>
          <Form.Item label={'分类名称'}
            extra={'编辑操作将当前分类名称修改为该名称，' +
                     '添加操作将为当前分类添加一个名为该名称的附属分类，删除操作将忽略此项（直接删除当前分类）'}>
            {form.getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入分类名称' }],
              initialValue: category.name
            })(<Input placeholder='分类名称'/>)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

ChangeCategoryForm.propTypes = {
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  onAdd: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  form: PropTypes.object,
  confirmLoading: PropTypes.bool,
  category: PropTypes.object
}

export default Form.create()(ChangeCategoryForm)
