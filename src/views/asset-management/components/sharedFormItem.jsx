import { Form, Input } from 'antd'
import React from 'react'

export const parent = (form) => {
  return (<Form.Item label={'父资产id'} help='填入父资产的id，如果没有父资产则不填'>
    {form.getFieldDecorator('parent_id', {})(<Input placeholder="父资产"/>)}
  </Form.Item>)
}
