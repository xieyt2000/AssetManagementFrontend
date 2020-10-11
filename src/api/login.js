import request from '@/utils/request'

export function reqLogin (data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function reqLogout (data) {
  return request({
    url: '/user/logout',
    method: 'post',
    data
  })
}
