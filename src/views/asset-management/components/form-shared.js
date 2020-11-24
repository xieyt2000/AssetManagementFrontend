import STATUS from '../../../utils/asset'
import { Form, Input, Select } from 'antd'
import React from 'react'

export function getStatusArr () {
  const statusArr = []
  for (const key in STATUS) {
    statusArr.push({ label: STATUS[key], value: STATUS[key] })
  }
  return statusArr
}

export const formLayout = {
  labelCol: { sm: { span: 4 } },
  wrapperCol: { sm: { span: 16 } }
}

export function getCustomPropFormItem (customPropList, form) {
  return (customPropList.map((propName) => (
    <Form.Item label={propName} key={propName}>
      {form.getFieldDecorator(`${propName}`)(
        <Input placeholder={propName}/>
      )}
    </Form.Item>
  )))
}

export function putCustom (form, customPropList) {
  const newForm = form
  newForm['custom'] = {}
  Object.keys(form).forEach((key) => {
    if (customPropList.indexOf(key) > -1) {
      newForm['custom'][key] = form[key]
    }
  })
  return newForm
}

export const parent = (form, idleAssetList, initial) => {
  initial = String(initial)
  const options = idleAssetList.map(asset =>
    <Select.Option key={String(asset.nid)} value={String(asset.nid)}>{asset.info}</Select.Option>)
  return (
    <Form.Item label="父资产:" help='选择父资产，如果没有父资产则不填'>
      {form.getFieldDecorator('parent_id',
        { initialValue: initial })(<Select allowClear={true}>{options}</Select>)}
    </Form.Item>
  )
}
