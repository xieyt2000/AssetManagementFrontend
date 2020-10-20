import configureStore from 'redux-mock-store'
import PERMISSION from './permission'
const mockStore = configureStore([])
export const store = mockStore({
  user: {
    name: 'yy',
    role: [PERMISSION.SYSTEM, PERMISSION.STAFF, PERMISSION.IT, PERMISSION.ASSET]
  },
  app: {
    sidebarCollapsed: false,
    settingPanelVisible: false
  }
})
