import React, { Component } from 'react'
import { Form, Button, Icon, Input } from 'antd'
import HelpCard from '../../components/HelpCard'
import { PropTypes } from 'prop-types'
import { getCustomProp, editCustomProp } from '../../api/asset'
import { handleResponse } from '../../utils/response'

class AssetCustom extends Component {
  constructor (props) {
    super(props)
    this.state = {
      customProps: []
    }
  }

  remove = (removeIdx) => {
    const curProps = this.props.form.getFieldValue('names')
    curProps.splice(removeIdx, 1)
    this.setState({
      customProps: curProps
    })
  }

  add = () => {
    const curProps = this.state.customProps.concat('')
    this.setState({
      customProps: curProps
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let { names } = values
        if (names === undefined) {
          names = []
        }
        handleResponse(editCustomProp({ custom: names }), '编辑', this, null, null,
          async () => {
            await this.localGetProps()
            this.props.form.resetFields()
          })
      }
    })
  }

  async localGetProps () {
    const customProps = await getCustomProp()
    this.setState({
      customProps: customProps.data.data
    })
  }

  componentDidMount () {
    this.localGetProps()
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const formItemLayoutWithOut = {
      wrapperCol: {
        span: 20, offset: 4
      }
    }
    const curProps = this.state.customProps
    const formItems = curProps.map((propName, index) => (
      <Form.Item
        {...formItemLayoutWithOut}
        required={false}
        key={index}
      >
        {getFieldDecorator(`names[${index}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              whitespace: true,
              message: '请输入自定义属性名称或者删除该条属性'
            }
          ],
          initialValue: propName
        })(<Input placeholder="属性名称" style={{ width: '60%', marginRight: 8 }}/>)}
        {
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(index)}
          />
        }
      </Form.Item>
    ))
    const description = '作为IT管理员，你可以管理资产的自定义属性，' +
      '增加、删除、修改字段。自定义属性适用于所有的资产'
    return (
      <div className='app-container'>
        <HelpCard title='自定义属性' source={description}/>
        <br/>
        <Form onSubmit={this.handleSubmit}>
          {formItems}
          <Form.Item {...formItemLayoutWithOut}>
            <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
              <Icon type="plus"/> 添加属性
            </Button>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 15 }}>
            <Button type="primary" htmlType='submit'>
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

AssetCustom.propTypes = {
  form: PropTypes.object
}

export default Form.create()(AssetCustom)
