import React, { Component } from 'react'
import { Collapse, TreeSelect, Form, Input, Button, Select } from 'antd'
import { PropTypes } from 'prop-types'

const { Panel } = Collapse
const { Option } = Select

class QueryPanel extends Component {
  state = {
    query: {
      name: '',
      category: '',
      description: '',
      customKey: '',
      customValue: ''
    }
  }

  render () {
    const { assetCategories, customProps, form } = this.props
    const options = customProps.map(prop => <Option key={prop}>{prop}</Option>)
    return (
      <Collapse defaultActiveKey={['0']}>
        <Panel header="条件搜索" key="1">
          <Form layout="inline">
            <Form.Item label="名称:">
              {form.getFieldDecorator('name')(<Input placeholder="名称"/>)}
            </Form.Item>
            <Form.Item label="类型:">
              {form.getFieldDecorator('category')(
                <TreeSelect
                  style={{ width: 120 }}
                  treeData={assetCategories}
                  allowClear={true}
                />)}
            </Form.Item>
            <Form.Item label="描述:">
              {form.getFieldDecorator('description')(<Input placeholder="描述"/>)}
            </Form.Item>
            <Form.Item label="自定义属性:">
              {form.getFieldDecorator('customKey')(<Select style={{ width: 120 }}
                allowClear={true}>{options}</Select>)}
            </Form.Item>
            <Form.Item>
              {form.getFieldDecorator('customValue')(<Input placeholder="属性值"/>)}
            </Form.Item>
            <Form.Item>
              <Button type="primary" icon="search" onClick={this.submit}>搜索</Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" icon="cross" onClick={this.props.clearQuery}>重置</Button>
            </Form.Item>
          </Form>
        </Panel>
      </Collapse>
    )
  }

  submit = () => {
    this.props.submitQuery()
  }
}

QueryPanel.propTypes = {
  assetCategories: PropTypes.array,
  form: PropTypes.object,
  submitQuery: PropTypes.func,
  clearQuery: PropTypes.func,
  customProps: PropTypes.array
}
export default Form.create()(QueryPanel)
