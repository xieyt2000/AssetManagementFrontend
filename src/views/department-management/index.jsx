import { Tree, Input } from 'antd'
import React from 'react'
import { departmentList, editDepartment, addDepartment, deleteDepartment } from '@/api/department'
import HelpCard from '../../components/HelpCard'
import ChangeDepartmentForm from './change-department-form'
import { getParentKey, expandTree, loop, handleOkChange, getChangFormData } from '../../utils/tree'

const { Search } = Input

class DepartmentManagement extends React.Component {
  state = {
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true,
    departments: [], // 有child的
    departmentList: [], // 展开的
    changeModalVis: false,
    changeModalLod: false,
    selectedDepartment: {
      id: '',
      name: ''
    }
  }

  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false
    })
  }

  onChange = e => {
    const { value } = e.target
    const { departments, departmentList: List } = this.state
    const expandedKeys = List
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

  handleOkAdd = () => {
    handleOkChange(getChangFormData(this, this.state.selectedDepartment.id), this, addDepartment,
      this.getDepartment, '添加')
  }

  handleOkEdit = () => {
    handleOkChange(getChangFormData(this, this.state.selectedDepartment.id), this, editDepartment,
      this.getDepartment, '编辑')
  }

  handleOkDelete = () => {
    handleOkChange(getChangFormData(this, this.state.selectedDepartment.id), this, deleteDepartment,
      this.getDepartment, '删除')
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
      expandTree([departments], tmpDepartmentList)
      this.setState({
        departmentList: tmpDepartmentList
      })
    }
  }

  render () {
    const { searchValue, expandedKeys, autoExpandParent, departments } = this.state
    const description = '作为资产管理员，你可以浏览企业的部门组织结构，' +
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
            onSelect={(selectedKeys, e) => {
              const selectedProps = e.node.props
              this.setState({
                changeModalVis: true,
                selectedDepartment: {
                  id: selectedProps.eventKey,
                  name: selectedProps.name
                }
              })
            }}
            style={{ fontSize: '20px' }}
          >
            {loop(searchValue, departments)}
          </Tree>
        </div>
        <ChangeDepartmentForm
          wrappedComponentRef={(formRef) => {
            this.changeFormRef = formRef
          }}
          visible={this.state.changeModalVis}
          confirmLoading={this.state.changeModalLod}
          onCancel={() => {
            this.setState({
              changeModalVis: false
            })
          }}
          onEdit={this.handleOkEdit}
          onAdd={this.handleOkAdd}
          onDelete={this.handleOkDelete}
          department={this.state.selectedDepartment}
        >
        </ChangeDepartmentForm>
      </div>
    )
  }
}

export default DepartmentManagement
