import React from 'react'
import { connect } from 'react-redux'
import { Icon, Menu, Dropdown, Modal, Layout, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import { logout, getUserInfo } from '@/store/actions'
// import Hamburger from '@/components/Hamburger'
import BreadCrumb from '@/components/BreadCrumb'
import './index.less'
import PropTypes from 'prop-types'

const { Header } = Layout

const LayoutHeader = (props) => {
  const {
    token,
    avatar,
    logout,
    getUserInfo,
    role
  } = props
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
  const onClick = ({ key }) => {
    switch (key) {
      case 'logout':
        handleLogout(token)
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
    </Menu>
  )

  return (
    <>
      {/* 这里是仿照antd pro的做法,如果固定header，
      则header的定位变为fixed，此时需要一个定位为relative的header把原来的header位置撑起来 */}
      <Header/>
      <Header
        style={{ width: 'calc(100% - 80px)' }}
        className={'fix-header'}
      >
        {/* <Hamburger /> */}
        <BreadCrumb />
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
