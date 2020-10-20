import request from '@/utils/request'

export function getLog (data) {
  return request({
    url: '/api/logs',
    method: 'post',
    data
  })
}
