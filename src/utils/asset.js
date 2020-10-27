export const CHINESE_KEY_TO_ENGLISH = {
  资产名称: 'name',
  资产分类: 'category',
  资产类型: 'type_name',
  资产价值: 'value',
  资产数量: 'quantity',
  资产描述: 'description',
  使用年限: 'service_life'
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
export default STATUS
