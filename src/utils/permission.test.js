import PERMISSION, { checkPermission } from './permission'

describe('utils/permission', () => {
  it('test checkPermission', () => {
    const roles = [PERMISSION.STAFF]
    const role = []
    expect(checkPermission(roles, role)).toBe(false)
  })
})
