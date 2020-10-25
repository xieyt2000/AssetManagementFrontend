import request from '@/utils/request'

export function departmentList () {
  return request({
    url: '/api/department/tree',
    method: 'get'
  })
}
