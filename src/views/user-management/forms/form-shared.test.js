import { getRoleArr, formLayout, validatePassWord } from './form-shared'
describe('test form-shared', () => {
  it('test getRoleArr', () => {
    const rolesArr = getRoleArr()
    expect(rolesArr.length).toBe(3)
  })
  it('test formLayout', () => {
    expect(formLayout.labelCol.sm.span).toBe(4)
  })
  it('test validatePassWord', () => {
    validatePassWord([], '123', () => {})
    validatePassWord([], '12345', () => {})
    validatePassWord([], undefined, () => {})
  })
})
