import PERMISSION, { CHINESE_PERMISSION } from '@/utils/permission'

export function getRoleArr () {
  const rolesArr = []
  for (const key in PERMISSION) {
    if (key === 'STAFF') {
      continue
    }
    rolesArr.push({ label: CHINESE_PERMISSION[key], value: PERMISSION[key] })
  }
  return rolesArr
}

export const formLayout = {
  labelCol: { sm: { span: 4 } },
  wrapperCol: { sm: { span: 16 } }
}
