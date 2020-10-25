import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Icon, Menu, Dropdown, Modal, Layout, Avatar, message } from 'antd'
import { Link } from 'react-router-dom'
import { logout, getUserInfo } from '@/store/actions'
import { changePassword } from '@/api/user'
import BreadCrumb from '@/components/BreadCrumb'
import './index.less'
import PropTypes from 'prop-types'
import ChangePasswordForm from './change-password-form'

const { Header } = Layout

const LayoutHeader = (props) => {
  const {
    token,
    avatar,
    logout,
    getUserInfo,
    role
  } = props
  const [changePasswordVis, setChangePasswordVis] = useState(false)
  const [changePasswordLoad, setChangePasswordLoad] = useState(false)
  // ???
  // token && getUserInfo(token)
  if (role.length === 0) {
    getUserInfo(token)
  }
  const handleLogout = (token) => {
    Modal.confirm({
      title: '注销',
      content: '确定要退出系统吗?',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        logout(token)
      }
    })
  }

  let changePasswordFormRef
  const handleChangePassword = () => {
    const form = changePasswordFormRef.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      setChangePasswordLoad(true)
      changePassword(values).then((res) => {
        form.resetFields()
        setChangePasswordLoad(false)
        setChangePasswordVis(false)
        if (res.data.code === 200) {
          message.success('修改密码成功！')
        } else if (res.data.code === 202) {
          message.error('当前密码输入错误！')
        }
      }).catch(() => {
        message.error('修改密码失败，请检查网络连接后重试')
      })
    })
  }
  const onClick = ({ key }) => {
    switch (key) {
      case 'logout':
        handleLogout(token)
        break
      case 'changePassword':
        setChangePasswordVis(true)
        break
      default:
        break
    }
  }
  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="dashboard">
        <Link to="/dashboard">首页</Link>
      </Menu.Item>
      <Menu.Divider/>
      <Menu.Item key="logout">注销</Menu.Item>
      <Menu.Divider/>
      <Menu.Item key="changePassword">更改密码</Menu.Item>
    </Menu>
  )

  return (
    <>
      <ChangePasswordForm
        wrappedComponentRef={(formRef) => {
          changePasswordFormRef = formRef
        }}
        visible={changePasswordVis}
        onCancel={() => {
          setChangePasswordVis(false)
        }}
        onOk={handleChangePassword}
        confirmLoading={changePasswordLoad}
      />
      {/* 这里是仿照antd pro的做法,如果固定header，
      则header的定位变为fixed，此时需要一个定位为relative的header把原来的header位置撑起来 */}
      <Header/>
      <Header
        style={{ width: 'calc(100% - 80px)' }}
        className={'fix-header'}
      >
        {/* <Hamburger /> */}
        <BreadCrumb/>
        <div className="right-menu">
          <div className="dropdown-wrap">
            <Dropdown overlay={menu}>
              <div>
                <Avatar shape="square" size="medium" src={avatar}/>
                <Icon style={{ color: 'rgba(0,0,0,.3)' }} type="caret-down"/>
              </div>
            </Dropdown>
          </div>
        </div>
      </Header>
    </>
  )
}

LayoutHeader.propTypes = {
  token: PropTypes.string,
  avatar: PropTypes.string,
  logout: PropTypes.func,
  getUserInfo: PropTypes.func,
  role: PropTypes.array
}

const mapStateToProps = (state) => {
  return {
    ...state.app,
    ...state.user,
    ...state.settings
  }
}
export default connect(mapStateToProps, { logout, getUserInfo })(LayoutHeader)
