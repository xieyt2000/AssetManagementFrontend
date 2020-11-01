import Mock from 'mockjs'
import getReturnFunc from './utils'
const list = []
const count = 20

for (let i = 0; i < count; i++) {
  list.push(Mock.mock({
    key: '@increment',
    order_no: '@guid()',
    price: '@float(1000, 15000, 0, 2)',
    'tag|1': ['success', 'pending']
  }))
}

export default {
  assetList: getReturnFunc('assetList'),
  addAsset: getReturnFunc('addAsset'),
  assetRequire: getReturnFunc('assetRequire'),
  assetCategoryList: getReturnFunc('assetCategoryList'),
  editAsset: getReturnFunc('editAsset'),
  addAssetCategory: getReturnFunc('addAssetCategory'),
  editAssetCategory: getReturnFunc('editAssetCategory'),
  deleteAssetCategory: getReturnFunc('deleteAssetCategory'),
  getAssetHistory: getReturnFunc('getAssetHistory')
}
