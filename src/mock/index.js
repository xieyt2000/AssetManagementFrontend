import Mock from 'mockjs'
import loginAPI from './login'

// 登录与用户相关
Mock.mock(/\/api\/user\/login/, 'post', loginAPI.login)
Mock.mock(/\/api\/user\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/api\/user\/info/, 'post', loginAPI.userInfo)

export default Mock
