import * as types from '../action-types'
import { reqUserInfo } from '@/api/user'

export const getUserInfo = (token) => (dispatch) => {
  return new Promise((resolve, reject) => {
    reqUserInfo(token)
      .then((response) => {
        const { data } = response
        if (data.status === 0) {
          const userInfo = data.userInfo
          dispatch(setUserInfo(userInfo))
          resolve(data)
        } else {
          const msg = data.message
          reject(msg)
        }
      })
      .catch((error) => {
        // 绕过后端请求直接进入
        const data = {
          status: 0,
          userInfo: {
            id: 'admin',
            role: 'admin',
            name: 'yy',
            avator: 'https://s1.ax1x.com/2020/04/28/J5hUaT.jpg',
            description: 'admin'
          }
        }
        const userInfo = data.userInfo
        dispatch(setUserInfo(userInfo))
        resolve(data)
        console.log(error)
        // reject(error)
      })
  })
}

export const setUserToken = (token) => {
  return {
    type: types.USER_SET_USER_TOKEN,
    token
  }
}

export const setUserInfo = (userInfo) => {
  return {
    type: types.USER_SET_USER_INFO,
    ...userInfo
  }
}

export const resetUser = () => {
  return {
    type: types.USER_RESET_USER
  }
}
