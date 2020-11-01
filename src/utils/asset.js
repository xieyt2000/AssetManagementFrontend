import React from 'react'

export const CHINESE_KEY_TO_ENGLISH = {
  资产名称: 'name',
  资产分类: 'category',
  资产类型: 'type_name',
  资产价值: 'value',
  资产数量: 'quantity',
  资产描述: 'description',
  使用年限: 'service_life',
  父资产: 'parent_id'
}

export const CHINESE_TYPE_TO_ENGLISH = {
  数量型: 'AMOUNT',
  条目型: 'ITEM'
}

export const ENGLISH_TYPE_TO_CHINESE = {
  AMOUNT: '数量型',
  ITEM: '条目型'
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
export const renderAssetType = (row) => {
  if (row.type_name === 'AMOUNT') {
    const str = '数量型'
    const quantity = '数量：' + row.quantity
    return (<span>{str}<br/>{quantity}</span>)
  } else {
    const str = '条目型'
    return (<span>{str}</span>)
  }
}
export const renderChineseStatus = (status) => {
  return (<span> {CHINESE_STATUS[status]} </span>)
}
export default STATUS
