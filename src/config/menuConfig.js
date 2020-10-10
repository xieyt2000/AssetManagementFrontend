const menuList = [
  {
    title: '首页',
    path: '/dashboard',
    icon: 'home',
    roles: ['admin', 'editor', 'guest']
  },
  {
    title: '权限测试',
    path: '/permission',
    icon: 'lock',
    children: [
      {
        title: '权限说明',
        path: '/permission/explanation',
        roles: ['admin']
      },
      {
        title: 'admin页面',
        path: '/permission/adminPage',
        roles: ['admin']
      },
      {
        title: 'guest页面',
        path: '/permission/guestPage',
        roles: ['guest']
      },
      {
        title: 'editor页面',
        path: '/permission/editorPage',
        roles: ['editor']
      }
    ]
  },
  {
    title: '路由嵌套',
    path: '/nested',
    icon: 'cluster',
    roles: ['admin', 'editor'],
    children: [
      {
        title: '菜单1',
        path: '/nested/menu1',
        children: [
          {
            title: '菜单1-1',
            path: '/nested/menu1/menu11',
            roles: ['admin', 'editor']
          },
          {
            title: '菜单1-2',
            path: '/nested/menu1/menu12',
            children: [
              {
                title: '菜单1-2-1',
                path: '/nested/menu1/menu12/menu121',
                roles: ['admin', 'editor']
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
    roles: ['admin', 'editor']
  },
  {
    title: '用户管理',
    path: '/user',
    icon: 'usergroup-add',
    roles: ['admin']
  }
]
export default menuList
