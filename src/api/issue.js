
import request from '@/utils/request'

export function applyRequire (data) {
  return request({
    url: '/api/issue/apply-require',
    method: 'post',
    data: data
  })
}

export function applyFix (data) {
  return request({
    url: '/api/issue/apply-fix',
    method: 'post',
    data: data
  })
}

export function applyTransfer (data) {
  return request({
    url: '/api/issue/apply-transfer',
    method: 'post',
    data: data
  })
}
export function applyReturn (data) {
  return request({
    url: '/api/issue/apply-return',
    method: 'post',
    data: data
  })
}
