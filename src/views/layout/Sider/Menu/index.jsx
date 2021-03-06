import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import { Scrollbars } from 'react-custom-scrollbars'
import { connect } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { addTag } from '@/store/actions'
import { getMenuItemInMenuListByProperty } from '@/utils'
import menuList from '@/config/menuList'
import './index.less'
import PropTypes from 'prop-types'
import { checkPermission } from '@/utils/permission'

const SubMenu = Menu.SubMenu
// 重新记录数组顺序
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

class SideMenu extends Component {
  state = {
    menuTreeNode: null,
    openKey: []
  }

  // filterMenuItem用来根据配置信息筛选可以显示的菜单项
  filterMenuItem = (item) => {
    const { roles } = item
    const { role } = this.props
    if (!roles || checkPermission(roles, role)) {
      return true
    } else if (item.children) {
      return !!item.children.find((child) => {
        if (!child.roles) {
          return true
        }
        return checkPermission(child.roles, role)
      })
    }
    return false
  }

  // 菜单渲染
  getMenuNodes = (List) => {
    // 得到当前请求的路由路径
    const path = this.props.location.pathname
    return List.reduce((pre, item) => {
      if (this.filterMenuItem(item)) {
        if (!item.children) {
          pre.push(
            <Menu.Item key={item.path}>
              <Link to={item.path}>
                {item.icon ? <Icon type={item.icon}/> : null}
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
          )
        } else {
          // 查找一个与当前请求路径匹配的子Item
          const cItem = item.children.find(
            (Item) => path.indexOf(Item.path) === 0
          )
          // 如果存在, 说明当前item的子列表需要打开
          if (cItem) {
            this.setState((state) => ({
              openKey: [...state.openKey, item.path]
            }))
          }

          // 向pre添加<SubMenu>
          pre.push(
            <SubMenu
              key={item.path}
              title={
                <span>
                  {item.icon ? <Icon type={item.icon}/> : null}
                  <span>{item.title}</span>
                </span>
              }
            >
              {this.getMenuNodes(item.children)}
            </SubMenu>
          )
        }
      }

      return pre
    }, [])
  }

  onDragEnd = (result) => {
    if (!result.destination) {
      return
    }
    const _items = reorder(
      this.state.menuTreeNode,
      result.source.index,
      result.destination.index
    )
    this.setState({
      menuTreeNode: _items
    })
  }

  handleMenuSelect = ({ key = '/dashboard' }) => {
    const menuItem = getMenuItemInMenuListByProperty(menuList, 'path', key)
    const { addTag } = this.props
    addTag(menuItem)
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillMount () {
    // change from componentWillMount
    const menuTreeNode = this.getMenuNodes(menuList)
    this.setState({
      menuTreeNode
    })
    this.handleMenuSelect(this.state.openKey)
  }

  render () {
    const path = this.props.location.pathname
    const openKey = this.state.openKey
    return (
      <div className="sidebar-menu-container">
        <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {this.state.menuTreeNode.map((item, index) => (
                    <Draggable
                      key={item.key}
                      draggableId={item.key}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Menu
                            mode="inline"
                            theme="dark"
                            onSelect={this.handleMenuSelect}
                            selectedKeys={[path]}
                            defaultOpenKeys={openKey}
                          >
                            {item}
                          </Menu>
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Scrollbars>
      </div>
    )
  }
}

SideMenu.propTypes = {
  role: PropTypes.array,
  addTag: PropTypes.func,
  location: PropTypes.object
}

export default connect((state) => state.user, { addTag })(withRouter(SideMenu))
