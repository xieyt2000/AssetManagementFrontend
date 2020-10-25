import { Tree, Input } from 'antd'
import React from 'react'
import { departmentList } from '@/api/department'
import HelpCard from '../../components/HelpCard'
const { TreeNode } = Tree
const { Search } = Input

const getParentKey = (key, tree) => {
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

const expandDepartment = (departments, tmpDepartmentList) => {
  for (let i = 0; i < departments.length; i++) {
    tmpDepartmentList.push({ id: departments[i].id, name: departments[i].name })
    if (departments[i].children) {
      expandDepartment(departments[i].children, tmpDepartmentList)
    }
  }
}

class DepartmentManagement extends React.Component {
  state = {
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true,
    departments: [], // 有child的
    departmentList: [] // 展开的
  }

  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false
    })
  }

  onChange = e => {
    const { value } = e.target
    const { departments, departmentList } = this.state
    const expandedKeys = departmentList
      .map(item => {
        if (item.name.indexOf(value) > -1) {
          return getParentKey(item.id, departments)
        }
        return null
      })
      .filter((item, i, self) => item && self.indexOf(item) === i)
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true
    })
    console.log(expandedKeys)
  }

  componentDidMount () {
    this.getDepartment()
  }

  getDepartment = async () => {
    const res = await departmentList()
    const { data: departments, code } = res.data
    if (code === 200) {
      this.setState({
        departments: [departments]
      })
      const tmpDepartmentList = []
      expandDepartment([departments], tmpDepartmentList)
      this.setState({
        departmentList: tmpDepartmentList
      })
    }
  }

  render () {
    const { searchValue, expandedKeys, autoExpandParent, departments } = this.state
    const loop = data =>
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
            <TreeNode key={item.id} title={title}>
              {loop(item.children)}
            </TreeNode>
          )
        }
        return <TreeNode key={item.id} title={title}/>
      })
    const description = '作为系统管理员，你可以浏览企业的部门组织结构，' +
      '通过左键点击部门名称来添加、修改、删除部门，下方的搜索框可以帮助你更快地定位部门'
    return (
      <div className='app-container'>
        <HelpCard title='部门管理' source={description}/>
        <br/>
        <div>
          <Search style={{ marginBottom: 8 }} placeholder="搜索" onChange={this.onChange}/>
          <Tree
            onExpand={this.onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
          >
            {loop(departments)}
          </Tree>
        </div>
      </div>
    )
  }
}

export default DepartmentManagement
