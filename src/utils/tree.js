import React from 'react'
import { Tree } from 'antd'
import { handleResponse } from './response'

const { TreeNode } = Tree

export const getParentKey = (key, tree) => {
  let parentKey
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.children) {
      if (node.children.some(item => item.id === key)) {
        parentKey = node.id
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children)
      }
    }
  }
  console.log(parentKey)
  return parentKey
}

export const expandTree = (departments, tmpDepartmentList) => {
  for (let i = 0; i < departments.length; i++) {
    tmpDepartmentList.push({ id: departments[i].id, name: departments[i].name })
    if (departments[i].children) {
      expandTree(departments[i].children, tmpDepartmentList)
    }
  }
}
export const loop = (searchValue, data) =>
  data.map(item => {
    const index = item.name.indexOf(searchValue)
    const beforeStr = item.name.substr(0, index)
    const afterStr = item.name.substr(index + searchValue.length)
    const title =
      index > -1 ? (
        <span>
          {beforeStr}
          <span style={{ color: '#f50' }}>{searchValue}</span>
          {afterStr}
        </span>
      ) : (
        <span>{item.name}</span>
      )
    if (item.children) {
      return (
        <TreeNode key={item.id} title={title}
          name={item.name}
        >
          {loop(searchValue, item.children)}
        </TreeNode>
      )
    }
    return <TreeNode key={item.id} title={title}/>
  })

export const getChangFormData = (self) => {
  const form = self.changeFormRef.props.form
  let ret = false
  form.validateFields((err, values) => {
    if (err) {
      return
    }
    const name = values.name
    const id = self.state.selectedDepartment.id
    ret = {
      name: name,
      id: id
    }
  })
  return ret
}

export const handleOkChange = (para, self, requestFunc, successFunc, oprMessage) => {
  if (!para) {
    return false
  }
  if (oprMessage === '添加') {
    para['parent_id'] = para['id']
  }
  self.setState({ changeModalLod: true })
  handleResponse(requestFunc(para), oprMessage, self, null,
    { changeModalLod: false, changeModalVis: false }, successFunc,
    self.changeFormRef.props.form.resetFields)
}
