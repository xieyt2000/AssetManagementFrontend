import { CHINESE_KEY_TO_ENGLISH, CHINESE_TYPE_TO_ENGLISH, ENGLISH_TYPE_TO_CHINESE,
  CHINESE_STATUS, renderAssetType, renderChineseStatus } from './asset'
describe('utils/asset', () => {
  const row = {
    type_name: 'AMOUNT'
  }
  it('test CHINESE_KEY_TO_ENGLISH', () => {
    expect(CHINESE_KEY_TO_ENGLISH['资产名称']).toBe('name')
  })
  it('test CHINESE_TYPE_TO_ENGLISH', () => {
    expect(CHINESE_TYPE_TO_ENGLISH['数量型']).toBe('AMOUNT')
  })
  it('test ENGLISH_TYPE_TO_CHINESE', () => {
    expect(ENGLISH_TYPE_TO_CHINESE['AMOUNT']).toBe('数量型')
  })
  it('test CHINESE_STATUS', () => {
    expect(CHINESE_STATUS['IDLE']).toBe('空闲中')
  })
  it('test renderChineseStatus', () => {
    renderChineseStatus('IDLE')
  })
  it('test renderAssetType AMOUNT', () => {
    row.type_name = 'AMOUNT'
    renderAssetType(row)
  })
  it('test renderAssetType ITEM', () => {
    row.type_name = 'ITEM'
    renderAssetType(row)
  })
})
