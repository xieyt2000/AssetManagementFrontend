import React from 'react'
import { connect } from 'react-redux'
import { Layout } from 'antd'
import Logo from './Logo'
import SideMenu from './Menu'
const { Sider } = Layout

const LayoutSider = (props) => {
  return (
    <Sider
      collapsible
      collapsed={false}
      trigger={null}
      style={{ zIndex: '10' }}
    >
      <Logo />
      <SideMenu />
    </Sider>
  )
}

const mapStateToProps = (state) => {
  return {
    ...state.app,
    ...state.settings
  }
}
export default connect(mapStateToProps)(LayoutSider)
