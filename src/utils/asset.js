import React from 'react'
import { assetCategoryList } from '../api/asset'

export const CHINESE_KEY_TO_ENGLISH = {
  资产名称: 'name',
  资产分类: 'category',
  资产类型: 'type_name',
  资产价值: 'value',
  资产描述: 'description',
  使用年限: 'service_life',
  父资产: 'parent_id'
}

const STATUS = {
  IDLE: 'IDLE',
  IN_USE: 'IN_USE',
  IN_MAINTAIN: 'IN_MAINTAIN',
  RETIRED: 'RETIRED',
  DELETED: 'DELETED'
}
export const CHINESE_STATUS = {
  IDLE: '空闲中',
  IN_USE: '使用中',
  IN_MAINTAIN: '维修中',
  RETIRED: '已清退',
  DELETED: '已删除'
}

export const renderChineseStatus = (status) => {
  return (<span> {CHINESE_STATUS[status]} </span>)
}

export const getAssetCategories = async (self) => {
  const res = await assetCategoryList()
  const { data: assetCategories, code } = res.data
  const newAssetCategories = [assetCategories]
  adaptAssetCategoryList(newAssetCategories)
  if (code === 200) {
    self.setState({
      assetCategoryList: newAssetCategories
    })
  }
}

const adaptAssetCategoryList = (CategoryList) => {
  CategoryList.forEach(item => {
    item.value = item.name
    item.label = item.name
    adaptAssetCategoryList(item.children)
  })
}

export default STATUS
