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
  assetList: (_) => {
    return {
      code: 20000,
      data: { items: list }
    }
  },
  addAsset: (_) => {
    return {
      data: 'addAsset'
    }
  },
  assetCollection: (_) => {
    return {
      data: 'assetCollection'
    }
  },
  assetCategoryList: (_) => {
    return {
      data: 'assetCategoryList'
    }
  },
  editAsset: getReturnFunc('editAsset'),
  addAssetCategory: getReturnFunc('addAssetCategory'),
  editAssetCategory: getReturnFunc('editAssetCategory'),
  deleteAssetCategory: getReturnFunc('deleteAssetCategory'),
  getAssetHistory: getReturnFunc('getAssetHistory')

}
