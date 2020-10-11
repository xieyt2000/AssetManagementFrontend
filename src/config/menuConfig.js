import PERMISSION from '../utils/permission'

const menuList = [
  {
    title: '首页',
    path: '/dashboard',
    icon: 'home',
    roles: [PERMISSION.IT, PERMISSION.ASSET, PERMISSION.SYSTEM, PERMISSION.STAFF]
  },
  {
    title: '权限测试',
    path: '/permission',
    icon: 'lock',
    children: [
      {
        title: '权限说明',
        path: '/permission/explanation',
        roles: [PERMISSION.IT, PERMISSION.ASSET, PERMISSION.SYSTEM, PERMISSION.STAFF]
      },
      {
        title: 'admin页面',
        path: '/permission/adminPage',
        roles: [PERMISSION.IT, PERMISSION.ASSET, PERMISSION.SYSTEM, PERMISSION.STAFF]
      },
      {
        title: 'guest页面',
        path: '/permission/guestPage',
        roles: [PERMISSION.IT, PERMISSION.ASSET, PERMISSION.SYSTEM, PERMISSION.STAFF]
      },
      {
        title: 'editor页面',
        path: '/permission/editorPage',
        roles: [PERMISSION.IT, PERMISSION.ASSET, PERMISSION.SYSTEM, PERMISSION.STAFF]
      }
    ]
  },
  {
    title: '路由嵌套',
    path: '/nested',
    icon: 'cluster',
    roles: [PERMISSION.IT, PERMISSION.ASSET, PERMISSION.SYSTEM, PERMISSION.STAFF],
    children: [
      {
        title: '菜单1',
        path: '/nested/menu1',
        children: [
          {
            title: '菜单1-1',
            path: '/nested/menu1/menu11',
            roles: [PERMISSION.IT, PERMISSION.ASSET, PERMISSION.SYSTEM, PERMISSION.STAFF]
          },
          {
            title: '菜单1-2',
            path: '/nested/menu1/menu12',
            children: [
              {
                title: '菜单1-2-1',
                path: '/nested/menu1/menu12/menu121',
                roles: [PERMISSION.IT, PERMISSION.ASSET, PERMISSION.SYSTEM, PERMISSION.STAFF]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    title: '表格',
    path: '/table',
    icon: 'table',
    roles: [PERMISSION.IT, PERMISSION.ASSET, PERMISSION.SYSTEM, PERMISSION.STAFF]
  },
  {
    title: '用户管理',
    path: '/user',
    icon: 'usergroup-add',
    roles: [PERMISSION.SYSTEM]
  }
]
export default menuList
