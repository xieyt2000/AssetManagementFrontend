
import request from '@/utils/request'

export function applyRequire (data) {
  return request({
    url: '/api/issue/require',
    method: 'post',
    data: data
  })
}

export function applyFix (data) {
  return request({
    url: '/api/issue/fix',
    method: 'post',
    data: data
  })
}

export function applyTransfer (data) {
  return request({
    url: '/api/issue/transfer',
    method: 'post',
    data: data
  })
}
export function applyReturn (data) {
  return request({
    url: '/api/issue/return',
    method: 'post',
    data: data
  })
}

export function issueToHandle () {
  return request({
    url: '/api/issue/handling',
    method: 'get'
  })
}

export function handleIssue (data) {
  return request({
    url: '/api/issue/handle',
    method: 'post',
    data: data
  })
}

export function handleRequire (data) {
  return request({
    url: '/api/issue/permit-require',
    method: 'post',
    data: data
  })
}

export function getRequireAsset (data) {
  return request({
    url: 'api/issue/require-asset-list',
    method: 'post',
    data: data
  })
}

export function personalIssue () {
  return request({
    url: '/api/issue/waiting',
    method: 'get'
  })
}

export function deleteIssue (data) {
  return request({
    url: '/api/issue/delete',
    method: 'post',
    data: data
  })
}
