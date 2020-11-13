import * as types from '../action-types'
import { getToken } from '@/utils/auth'
const avatarUrl = 'https://ss2.bdstatic.com/' +
  '70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=188149577,2949073731&fm=26&gp=0.jpg'
const initUserInfo = {
  name: '',
  role: Array(0),
  avatar: avatarUrl,
  token: getToken(),
  department: ''
}
export default function user (state = initUserInfo, action) {
  switch (action.type) {
    case types.USER_SET_USER_TOKEN:
      return {
        ...state,
        token: action.token
      }
    case types.USER_SET_USER_INFO:
      return {
        ...state,
        name: action.name,
        role: action.role,
        avatar: avatarUrl,
        department: action.department
      }
    case types.USER_RESET_USER:
      return {}
    default:
      return state
  }
}
