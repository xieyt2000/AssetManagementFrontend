import { CHINESE_KEY_TO_ENGLISH,
  CHINESE_STATUS, renderChineseStatus } from './asset'
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
})
