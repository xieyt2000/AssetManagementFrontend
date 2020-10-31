import React, { Component } from 'react'
import { Form, Input, Modal } from 'antd'
import { PropTypes } from 'prop-types'

class InputForm extends Component {
  validateName = async (rule, name, callback) => {
    if (name) {
      if (!/^[a-zA-Z0-9]{4,20}$/.test(name)) {
        callback('用户名必须为4-20位数字或字母组合')
      }
    } else {
      callback('请输入用户名')
    }
    callback()
  }

  render () {
    const { title, label } = this.props
    const { visible, onCancel, onOk, form, confirmLoading } = this.props

    const formLayout = {
      labelCol: { sm: { span: 4 } },
      wrapperCol: { sm: { span: 16 } }
    }
    return (
      <Modal title={title} visible={visible} onCancel={onCancel}
        onOk={onOk} confirmLoading={confirmLoading}>
        <Form {...formLayout}>
          <Form.Item label={label}>
            {form.getFieldDecorator('name', {
              rules: [{ required: true, validator: this.validateName }]
            })(<Input placeholder={label}/>)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

InputForm.propTypes = {
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  confirmLoading: PropTypes.bool,
  form: PropTypes.object,
  title: PropTypes.string,
  label: PropTypes.string
}

export default Form.create()(InputForm)
