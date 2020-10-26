import React from 'react'
import { Tree } from 'antd'
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
