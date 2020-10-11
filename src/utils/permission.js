const PERMISSION = {
  IT: 'IT',
  ASSET: 'ASSET',
  SYSTEM: 'SYSTEM',
  STAFF: 'STAFF'
}

export const CHINESE_PERMISSION = {
  IT: 'IT管理员',
  ASSET: '资产管理员',
  SYSTEM: '系统管理员',
  STAFF: '员工'
}

export const checkPermission = (roles, role) => {
  for (let i = 0; i < role.length; i++) {
    if (roles.includes(role[i])) {
      return true
    }
  }
  return false
}
export default PERMISSION
