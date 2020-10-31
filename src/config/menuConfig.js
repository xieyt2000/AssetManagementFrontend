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
        title: '系统管理员页面',
        path: '/permission/SystemPage',
        roles: [PERMISSION.SYSTEM]
      },
      {
        title: '资产管理员页面',
        path: '/permission/AssetPage',
        roles: [PERMISSION.ASSET]
      },
      {
        title: 'IT管理员页面',
        path: '/permission/ITPage',
        roles: [PERMISSION.IT]
      },
      {
        title: '员工页面',
        path: '/permission/StaffPage',
        roles: [PERMISSION.STAFF]
      }
    ]
  },
  {
    title: '资产管理',
    path: '/asset',
    icon: 'account-book',
    children: [
      {
        title: '资产列表',
        path: '/asset/management',
        roles: [PERMISSION.ASSET]
      },
      {
        title: '资产分类',
        path: '/asset/category',
        roles: [PERMISSION.IT]
      }
    ]
  },
  // {
  //   title: '路由嵌套',
  //   path: '/nested',
  //   icon: 'cluster',
  //   roles: [PERMISSION.IT, PERMISSION.ASSET, PERMISSION.SYSTEM, PERMISSION.STAFF],
  //   children: [
  //     {
  //       title: '菜单1',
  //       path: '/nested/menu1',
  //       children: [
  //         {
  //           title: '菜单1-1',
  //           path: '/nested/menu1/menu11',
  //           roles: [PERMISSION.IT, PERMISSION.ASSET, PERMISSION.SYSTEM, PERMISSION.STAFF]
  //         },
  //         {
  //           title: '菜单1-2',
  //           path: '/nested/menu1/menu12',
  //           children: [
  //             {
  //               title: '菜单1-2-1',
  //               path: '/nested/menu1/menu12/menu121',
  //               roles: [PERMISSION.IT, PERMISSION.ASSET, PERMISSION.SYSTEM, PERMISSION.STAFF]
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   title: '表格',
  //   path: '/table',
  //   icon: 'table',
  //   roles: [PERMISSION.IT, PERMISSION.ASSET, PERMISSION.SYSTEM, PERMISSION.STAFF]
  // },
  {
    title: '用户管理',
    path: '/user',
    icon: 'usergroup-add',
    roles: [PERMISSION.SYSTEM]
  },
  {
    title: '部门管理',
    path: '/department',
    icon: 'profile',
    roles: [PERMISSION.ASSET]
  },
  {
    title: '操作日志',
    path: '/log',
    icon: 'database',
    roles: [PERMISSION.SYSTEM]
  },
  {
    title: '资产领用',
    path: '/asset/collection',
    icon: 'down-square',
    roles: [PERMISSION.IT, PERMISSION.ASSET, PERMISSION.SYSTEM, PERMISSION.STAFF]
  }

]
export default menuList
