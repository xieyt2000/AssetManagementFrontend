import Mock from 'mockjs'
import loginAPI from './login'
import remoteSearchAPI from './asset'
import departmentAPI from './department'
import logAPI from './log'
import UserAPI from './user'
// 登录与用户相关
Mock.mock(/\/api\/user\/login/, 'post', loginAPI.login)
Mock.mock(/\/api\/user\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/api\/user\/info/, 'post', loginAPI.userInfo)

// asset
Mock.mock(/\/api\/asset\/list/, 'get', remoteSearchAPI.assetList)
Mock.mock(/\/api\/asset\/add/, 'post', remoteSearchAPI.addAsset)
Mock.mock(/\/api\/asset\/edit/, 'post', remoteSearchAPI.editAsset)
Mock.mock(/\/api\/asset\/require/, 'post', remoteSearchAPI.assetCollection)
Mock.mock(/\/api\/asset\/category\/tree/, 'get', remoteSearchAPI.assetCategoryList)
Mock.mock(/api\/asset\/category\/add/, 'post', remoteSearchAPI.addAssetCategory)
Mock.mock(/api\/asset\/category\/edit/, 'post', remoteSearchAPI.editAssetCategory)
Mock.mock(/api\/asset\/category\/delete/, 'post', remoteSearchAPI.deleteAssetCategory)
Mock.mock(/\/api\/asset\/history/, 'post', remoteSearchAPI.getAssetHistory)

// department
Mock.mock(/\/api\/department\/tree/, 'get', departmentAPI.departmentList)
Mock.mock(/api\/department\/add/, 'post', departmentAPI.addDepartment)
Mock.mock(/api\/department\/edit/, 'post', departmentAPI.editDepartment)
Mock.mock(/api\/department\/delete/, 'post', departmentAPI.deleteDepartment)

// log
Mock.mock(/\/api\/logs/, 'post', logAPI.getLog)

// user
Mock.mock(/\/api\/user\/info/, 'post', UserAPI.reqUserInfo)
Mock.mock(/\/api\/user\/list/, 'get', UserAPI.getUsers)
Mock.mock(/\/api\/user\/delete/, 'post', UserAPI.deleteUser)
Mock.mock(/\/api\/user\/lock/, 'post', UserAPI.lockUser)
Mock.mock(/\/api\/user\/edit/, 'post', UserAPI.editUser)
Mock.mock(/\/api\/user\/exist/, 'post', UserAPI.nameExist)
Mock.mock(/\/api\/user\/add/, 'post', UserAPI.addUser)
Mock.mock(/api\/user\/change-password/, 'post', UserAPI.changePassword)
export default Mock
