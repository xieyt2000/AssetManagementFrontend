import Mock from 'mockjs'
import loginAPI from './login'
import remoteSearchAPI from './remoteSearch'

// 登录与用户相关
Mock.mock(/\/api\/user\/login/, 'post', loginAPI.login)
Mock.mock(/\/api\/user\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/api\/user\/info/, 'post', loginAPI.userInfo)

// dashboard
Mock.mock(/\/asset\/list/, 'get', remoteSearchAPI.assetList)

export default Mock
