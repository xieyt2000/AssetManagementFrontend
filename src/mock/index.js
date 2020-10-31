import Mock from 'mockjs'
import loginAPI from './login'
import remoteSearchAPI from './asset'

// 登录与用户相关
Mock.mock(/\/api\/user\/login/, 'post', loginAPI.login)
Mock.mock(/\/api\/user\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/api\/user\/info/, 'post', loginAPI.userInfo)

// asset
Mock.mock(/\/api\/asset\/list/, 'get', remoteSearchAPI.assetList)
Mock.mock(/\/api\/asset\/add/, 'post', remoteSearchAPI.addAsset)
Mock.mock(/\/api\/asset\/require/, 'post', remoteSearchAPI.assetCollection)
Mock.mock(/\/api\/asset\/category\/tree/, 'get', remoteSearchAPI.assetCategoryList)
Mock.mock(/api\/asset\/category\/add/, 'post', remoteSearchAPI.addAssetCategory)

export default Mock
