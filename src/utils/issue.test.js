import { CHINESE_ISSUE } from './issue'
describe('utils/issue', () => {
  it('test CHINESE_ISSUE', () => {
    expect(CHINESE_ISSUE).toHaveProperty('TRANSFER', '转移')
  })
})
