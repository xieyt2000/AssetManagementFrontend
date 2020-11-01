import Mock from 'mockjs'
import loginAPI from './login'
import AssetAPI from './asset'
import departmentAPI from './department'
import logAPI from './log'
import UserAPI from './user'
import IssueAPI from './issue'
// 登录与用户相关
Mock.mock(/\/api\/user\/login/, 'post', loginAPI.login)
Mock.mock(/\/api\/user\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/api\/user\/info/, 'post', loginAPI.userInfo)

// asset
Mock.mock(/\/api\/asset\/list/, 'get', AssetAPI.assetList)
Mock.mock(/\/api\/asset\/add/, 'post', AssetAPI.addAsset)
Mock.mock(/\/api\/asset\/edit/, 'post', AssetAPI.editAsset)
Mock.mock(/\/api\/asset\/require/, 'post', AssetAPI.assetRequire)
Mock.mock(/\/api\/asset\/category\/tree/, 'get', AssetAPI.assetCategoryList)
Mock.mock(/api\/asset\/category\/add/, 'post', AssetAPI.addAssetCategory)
Mock.mock(/api\/asset\/category\/edit/, 'post', AssetAPI.editAssetCategory)
Mock.mock(/api\/asset\/category\/delete/, 'post', AssetAPI.deleteAssetCategory)
Mock.mock(/\/api\/asset\/history/, 'post', AssetAPI.getAssetHistory)
Mock.mock(/\/api\/user\/assets/, 'get', AssetAPI.personalAssetList)
Mock.mock(/\/api\/asset\/available/, 'get', AssetAPI.availableAssetList)
Mock.mock(/\/api\/asset\/query/, 'post', AssetAPI.assetQuery)
Mock.mock(/\/api\/asset\/custom\/list/, 'get', AssetAPI.getCustomProp)
Mock.mock(/\/api\/asset\/custom\/edit/, 'post', AssetAPI.editCustomProp)

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

// issue
Mock.mock(/\/api\/issue\/require/, 'post', IssueAPI.applyRequire)
Mock.mock(/\/api\/issue\/fix/, 'post', IssueAPI.applyFix)
Mock.mock(/\/api\/issue\/transfer/, 'post', IssueAPI.applyTransfer)
Mock.mock(/\/api\/issue\/return/, 'post', IssueAPI.applyReturn)
Mock.mock(/\/api\/issue\/handling/, 'get', IssueAPI.issueToHandle)
Mock.mock(/\/api\/issue\/handle/, 'post', IssueAPI.handleIssue)
Mock.mock(/\/api\/issue\/waiting/, 'get', IssueAPI.personalIssue)

export default Mock
