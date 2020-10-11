const PERMISSION = {
  IT: 'it',
  ASSET: 'asset',
  SYSTEM: 'system',
  STAFF: 'staff'
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
