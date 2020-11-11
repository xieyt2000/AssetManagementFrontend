import { CHINESE_KEY_TO_ENGLISH,
  CHINESE_STATUS, renderChineseStatus, getAssetCategories, adaptAssetCategoryList } from './asset'
import '@/mock'
const testNode = {
  state: {
    assetCategoryList: []
  },
  setState: function (data) {
    this.state.assetCategoryList = data.assetCategoryList
  }
}
describe('utils/asset', () => {
  it('test CHINESE_KEY_TO_ENGLISH', () => {
    expect(CHINESE_KEY_TO_ENGLISH['资产名称']).toBe('name')
  })
  it('test CHINESE_STATUS', () => {
    expect(CHINESE_STATUS['IDLE']).toBe('空闲中')
  })
  it('test renderChineseStatus', () => {
    renderChineseStatus('IDLE')
  })
  it('test getAssetCategories', async () => {
    await getAssetCategories(testNode)
    expect(testNode.state.assetCategoryList.length).toBe(1)
  })
})
