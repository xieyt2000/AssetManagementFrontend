import * as types from '../action-types'
import { getToken } from '@/utils/auth'
const avatarUrl = 'https://timgsa.baidu.com/' +
    'timg?image&quality=80&size=b9999_10000&' +
    'sec=1603906435701&di=cdc5f0f9910240be985409164370eb79&imgtype=0&' +
    'src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%' +
    '2F202001%2F24%2F20200124152835_hiLnr.thumb.400_0.jpeg'
const initUserInfo = {
  name: '',
  role: Array(0),
  avatar: avatarUrl,
  token: getToken()
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
        avatar: avatarUrl
      }
    case types.USER_RESET_USER:
      return {}
    default:
      return state
  }
}
