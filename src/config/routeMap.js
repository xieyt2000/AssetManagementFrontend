import Loadable from 'react-loadable'
import Loading from '@/components/Loading'
import PERMISSION from '../utils/permission'

const Dashboard = Loadable({
  loader: () => import(/* webpackChunkName:'Dashboard' */'@/views/dashboard'),
  loading: Loading
})
const User = Loadable({
  loader: () => import(/* webpackChunkName:'User' */'@/views/user-management'),
  loading: Loading
})
const AssetManageMent = Loadable({
  loader: () => import(/* webpackChunkName:'AssetManagement' */'@/views/asset-management'),
  loading: Loading
})
const Log = Loadable({
  loader: () => import(/* webpackChunkName:'User' */'@/views/log'),
  loading: Loading
})
const DepartmentManagement = Loadable({
  loader: () => import(/* webpackChunkName:'User' */'@/views/department-management'),
  loading: Loading
})

export default [
  {
    path: '/dashboard',
    component: Dashboard,
    roles: [PERMISSION.IT, PERMISSION.ASSET, PERMISSION.SYSTEM, PERMISSION.STAFF]
  },
  {
    path: '/user',
    component: User,
    roles: [PERMISSION.SYSTEM]
  },
  {
    path: '/log',
    component: Log,
    roles: [PERMISSION.SYSTEM]
  },
  {
    path: '/asset/management',
    component: AssetManageMent,
    roles: [PERMISSION.ASSET]
  },
  {
    path: '/department',
    component: DepartmentManagement,
    roles: [PERMISSION.ASSET]
  }
  // { path: '/permission/explanation', component: Explanation, roles: ['admin'] },
  // { path: '/permission/adminPage', component: AdminPage, roles: ['admin'] },
  // { path: '/permission/guestPage', component: GuestPage, roles: ['guest'] },
  // { path: '/permission/editorPage', component: EditorPage, roles: ['editor'] },
  // { path: '/nested/menu1/menu11', component: Menu11, roles: ['admin', 'editor'] },
  // { path: '/nested/menu1/menu12/menu121', component: Menu121, roles: ['admin', 'editor'] }
]
