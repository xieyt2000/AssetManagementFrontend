import Mock from 'mockjs'
import loginAPI from './login'

// 登录与用户相关
Mock.mock(/\/user\/login/, 'post', loginAPI.login)
Mock.mock(/\/user\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info/, 'post', loginAPI.userInfo)

export default Mock
