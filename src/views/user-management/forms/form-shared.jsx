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

export const validatePassWord = (rule, password, callback) => {
  if (password) {
    if (!/^[a-zA-Z0-9]{4,20}$/.test(password)) {
      callback('密码必须为4-20位数字或字母组合')
    }
  } else {
    callback('请输入密码')
  }
  callback()
}
export const displayRender = (label) => {
  return label[label.length - 1]
}
