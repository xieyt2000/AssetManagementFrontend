
import request from '@/utils/request'

export function applyFix (data) {
  return request({
    url: '/api/asset/apply-fix',
    method: 'post',
    data: data
  })
}

export function applyTransfer (data) {
  return request({
    url: '/api/asset/apply-transfer',
    method: 'post',
    data: data
  })
}
export function applyReturn (data) {
  return request({
    url: '/api/asset/apply-return',
    method: 'post',
    data: data
  })
}
