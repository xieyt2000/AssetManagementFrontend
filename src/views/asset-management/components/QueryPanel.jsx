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
    const { assetCategories, customProps } = this.props
    const options = customProps.map(prop => <Option key={prop}>{prop}</Option>)
    return (
      <Collapse defaultActiveKey={['0']}>
        <Panel header="条件搜索" key="1">
          <Form layout="inline">
            <Form.Item label="名称:">
              <Input onChange={this.queryNameChange}/>
            </Form.Item>
            <Form.Item label="类型:">
              <TreeSelect
                style={{ width: 120 }}
                onChange={this.queryCategoryChange}
                treeData={assetCategories}
              />
            </Form.Item>
            <Form.Item label="描述:">
              <Input onChange={this.queryDesChange}/>
            </Form.Item>
            <Form.Item label="自定义属性:">
              <Select style={{ width: 120 }}
                onChange={this.queryCustomPropSelectChange}>{options}</Select>
            </Form.Item>
            <Form.Item>
              <Input onChange={this.queryCustomValChange}/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" icon="search" onClick={this.submit}>搜索</Button>
            </Form.Item>
          </Form>
        </Panel>
      </Collapse>
    )
  }

  queryCustomPropSelectChange = (prop) => {
    this.setState((state) => ({
      query: {
        ...state.query,
        customKey: prop
      }
    }))
  }

  queryCustomValChange = (e) => {
    const value = e.target.value
    this.setState((state) => ({
      query: {
        ...state.query,
        customValue: value
      }
    }))
  }

  queryNameChange = (e) => {
    const value = e.target.value
    this.setState((state) => ({
      query: {
        ...state.query,
        name: value
      }
    }))
  }

  queryCategoryChange = (value) => {
    this.setState((state) => ({
      query: {
        ...state.query,
        category: value
      }
    }))
  }

  queryDesChange = (e) => {
    const value = e.target.value
    this.setState((state) => ({
      query: {
        ...state.query,
        description: value
      }
    }))
  }

  submit = () => {
    this.props.submitQuery(this.state.query)
  }
}

QueryPanel.propTypes = {
  assetCategories: PropTypes.array,
  submitQuery: PropTypes.func,
  customProps: PropTypes.array
}
export default QueryPanel
