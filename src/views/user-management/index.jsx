import React, { Component } from 'react'
import { deleteUser, getUsers, addUser, editUser, lockUser } from '@/api/user'
import { Button, Card, Table, message, Divider, Modal } from 'antd'
import HelpCard from '../../components/HelpCard'
import EditUserForm from './forms/edit-user-form'
import AddUserForm from './forms/add-user-form'
import { CHINESE_PERMISSION } from '@/utils/permission'
import { getDepartments } from '../../utils/department'
import { deleteColor, disableColor, editColor } from '../../utils/style'

const Column = Table.Column

class UserManagement extends Component {
  constructor (props) {
    super(props)
    this.state = {
      users: [],
      editModalVis: false, // vis for visible
      editModalLod: false, // loa for loading
      rowData: {},
      addModalVis: false,
      addModalLod: false,
      departmentList: []
    }
  }

  render () {
    const users = this.state.users
    const departmentList = this.state.departmentList
    const cardTitle = (
      <span>
        <Button type='primary' onClick={this.handleClickAdd}>添加用户</Button>
      </span>
    )
    const description = '作为系统管理员和资产管理员，你可以进行用户管理。包括添加、删除用户，修改用户信息'
    return (
      <div className='app-container'>
        <HelpCard title='用户管理' source={description}/>
        <Card title={cardTitle}>
          <Table
            bordered rowKey="name"
            dataSource={users}
            pagination={false}>
            <Column title="用户名" dataIndex="name" key="name" align="center"/>
            <Column title="用户角色" dataIndex="roleStr" key="roleStr" align="center"/>
            <Column title="用户部门" dataIndex="department" key="department" align="center"/>
            <Column title="操作" key="action" width={200} align="center" render={(row) => (
              <span>
                <Button type="primary" shape="circle" icon={row.is_active ? 'unlock' : 'lock'}
                  title="锁定" style={row.is_active ? {} : disableColor}
                  onClick={this.handleClickLock.bind(this, row)}/>
                <Divider type="vertical"/>
                <Button type="primary" shape="circle" icon="edit" title="编辑"
                  style={editColor} onClick={this.handleClickEdit.bind(this, row)}/>
                <Divider type="vertical"/>
                <Button type="primary" shape="circle" icon="delete" title="删除"
                  onClick={this.handleClickDelete.bind(this, row)} style={deleteColor}/>
              </span>)}/>
          </Table>
        </Card>
        <EditUserForm
          rowData={this.state.rowData}
          wrappedComponentRef={(formRef) => {
            this.editFormRef = formRef
          }}
          visible={this.state.editModalVis}
          conirmLoading={this.state.editModalLod}
          onCancel={this.handleCancel}
          onOk={this.handleOkEdit}
          departments={departmentList}
        />
        <AddUserForm
          wrappedComponentRef={(formRef) => {
            this.addFormRef = formRef
          }}
          visible={this.state.addModalVis}
          confirmLoading={this.state.addModalLod}
          onCancel={this.handleCancel}
          onOk={this.handleOkAdd}
          departments={departmentList}
        />
      </div>
    )
  }

  // avoid naming conflict with api.getUsers
  localGetUsers = async () => {
    function genRoleStr (roles) {
      return Array.from(roles, role =>
        CHINESE_PERMISSION[role]).join('，')
    }
    const res = await getUsers()
    const { data: users, code } = res.data
    for (let i = 0; i < users.length; i++) {
      users[i].roleStr = genRoleStr(users[i].role)
    }
    if (code === 200) {
      this.setState({
        users: users
      })
    }
  }

  handleClickEdit = (row) => {
    this.setState({
      rowData: Object.assign({}, row),
      editModalVis: true
    })
  }

  handleClickDelete = (row) => {
    Modal.confirm({
      title: '删除',
      content: '确定要删除' + row.name + '吗',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        const name = row.name
        deleteUser({ name: name }).then(
          (res) => {
            if (res.data.code === 200) {
              message.success('删除成功')
            } else {
              message.error('删除失败，' + res.data.message)
            }
            this.localGetUsers()
          }
        ).catch((ignored) => {
          message.error('删除失败，请检查网络连接后重试！')
        })
      }
    })
  }

  handleClickLock = (row) => {
    const name = row.name
    const active = row.is_active
    const oprStr = active ? '锁定' : '解锁'
    lockUser({ username: name, active: active ? 0 : 1 }).then(
      (res) => {
        if (res.data.code === 200) {
          message.success(oprStr + '成功')
        } else {
          message.error(oprStr + '失败，' + res.data.message)
        }
        this.localGetUsers()
      }
    ).catch((ignored) => {
      message.error(oprStr + '失败，请检查网络连接后重试！')
    })
  }

  handleClickAdd = () => {
    this.setState({
      addModalVis: true
    })
  }

  fixEmptyRole = (values) => {
    if (values.role === undefined) {
      values.role = ['STAFF']
    }
  }

  handleOkEdit = (ignore) => {
    const form = this.editFormRef.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      if (values.password === undefined) {
        values.password = ''
      }
      this.fixEmptyRole(values)
      this.setState({ editModalLod: true })
      editUser(values).then((res) => {
        form.resetFields()
        this.setState({ editModalVis: false, editModalLod: false })
        if (res.data.code === 200) {
          message.success('编辑成功！')
        } else {
          message.error('编辑失败，' + res.data.message)
        }
        this.localGetUsers()
      }).catch((ignored) => {
        message.error('编辑失败，请检查网络连接后重试！')
      })
    })
  }

  handleOkAdd = (ignore) => {
    const form = this.addFormRef.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      this.fixEmptyRole(values)
      this.setState({ addModalLod: true })
      addUser(values).then((res) => {
        form.resetFields()
        this.setState({ addModalVis: false, addModalLod: false })
        if (res.data.code === 200) {
          message.success('添加成功！')
        } else {
          message.error('添加失败，' + res.data.message)
        }
        this.localGetUsers()
      }).catch((ignored) => {
        message.success('添加失败，请检查网络连接后重试！')
      })
    })
  }

  handleCancel = (ignore) => {
    this.setState({
      addModalVis: false,
      editModalVis: false
    })
  }

  componentDidMount () {
    this.localGetUsers()
    getDepartments(this)
  }
}

export default UserManagement
