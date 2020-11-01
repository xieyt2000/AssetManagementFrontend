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
const AssetCategory = Loadable({
  loader: () => import(/* webpackChunkName:'AssetManagement' */'@/views/asset-category'),
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
const AssetRequire = Loadable({
  loader: () => import(/* webpackChunkName:'User' */'@/views/asset-require'),
  loading: Loading
})
const PersonalAsset = Loadable({
  loader: () => import(/* webpackChunkName:'User' */'@/views/personal-asset'),
  loading: Loading
})

const AssetCustom = Loadable({
  loader: () => import('@/views/asset-custom'),
  loading: Loading
})

const IssueBoard = Loadable({
  loader: () => import(/* webpackChunkName:'User' */'@/views/issue-board'),
  loading: Loading
})
const IssuePersonal = Loadable({
  loader: () => import(/* webpackChunkName:'User' */'@/views/issue-personal'),
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
    path: '/asset/category',
    component: AssetCategory,
    roles: [PERMISSION.IT]
  },
  {
    path: '/department',
    component: DepartmentManagement,
    roles: [PERMISSION.ASSET]
  },
  {
    path: '/asset/require',
    component: AssetRequire,
    roles: [PERMISSION.IT, PERMISSION.ASSET, PERMISSION.SYSTEM, PERMISSION.STAFF]
  },
  {
    path: '/asset/personal',
    component: PersonalAsset,
    roles: [PERMISSION.IT, PERMISSION.ASSET, PERMISSION.SYSTEM, PERMISSION.STAFF]
  },
  {
    path: '/asset/custom',
    component: AssetCustom,
    roles: [PERMISSION.IT]
  },
  {
    path: '/issue/handle',
    component: IssueBoard,
    roles: [PERMISSION.IT, PERMISSION.ASSET, PERMISSION.SYSTEM, PERMISSION.STAFF]
  },
  {
    path: '/issue/personal',
    component: IssuePersonal,
    roles: [PERMISSION.IT, PERMISSION.ASSET, PERMISSION.SYSTEM, PERMISSION.STAFF]
  }
]
