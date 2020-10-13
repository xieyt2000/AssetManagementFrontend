import Loadable from 'react-loadable'
import Loading from '@/components/Loading'
import PERMISSION from '../utils/permission'
const Dashboard = Loadable({ loader: () => import(/* webpackChunkName:'Dashboard' */'@/views/dashboard'), loading: Loading })
// const Explanation = Loadable({ loader: () => import(/* webpackChunkName:'Explanation' */'@/views/permission'), loading: Loading })
// const AdminPage = Loadable({ loader: () => import(/* webpackChunkName:'AdminPage' */'@/views/permission/adminPage'), loading: Loading })
// const GuestPage = Loadable({ loader: () => import(/* webpackChunkName:'GuestPage' */'@/views/permission/guestPage'), loading: Loading })
// const EditorPage = Loadable({ loader: () => import(/* webpackChunkName:'EditorPage' */'@/views/permission/editorPage'), loading: Loading })
// const Menu11 = Loadable({ loader: () => import(/* webpackChunkName:'MenuAA' */'@/views/nested/menu1/menu1-1'), loading: Loading })
// const Menu121 = Loadable({ loader: () => import(/* webpackChunkName:'MenuABA' */'@/views/nested/menu1/menu1-2/menu1-2-1'), loading: Loading })
const User = Loadable({
  loader: () => import(/* webpackChunkName:'User' */'@/views/user-management'),
  loading: Loading
})

export default [
  { path: '/dashboard', component: Dashboard, roles: [PERMISSION.IT, PERMISSION.ASSET, PERMISSION.SYSTEM, PERMISSION.STAFF] },
  { path: '/user', component: User, roles: [PERMISSION.SYSTEM] }
  // { path: '/permission/explanation', component: Explanation, roles: ['admin'] },
  // { path: '/permission/adminPage', component: AdminPage, roles: ['admin'] },
  // { path: '/permission/guestPage', component: GuestPage, roles: ['guest'] },
  // { path: '/permission/editorPage', component: EditorPage, roles: ['editor'] },
  // { path: '/nested/menu1/menu11', component: Menu11, roles: ['admin', 'editor'] },
  // { path: '/nested/menu1/menu12/menu121', component: Menu121, roles: ['admin', 'editor'] }
]
