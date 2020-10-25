import request from '@/utils/request'

export function departmentList () {
  return request({
    url: '/api/department/tree',
    method: 'get'
  })
}

export function addDepartment (data) {
  return request({
    url: 'api/department/add',
    method: 'post',
    data: data
  })
}

export function editDepartment (data) {
  return request({
    url: 'api/department/edit',
    method: 'post',
    data: data
  })
}

export function deleteDepartment (data) {
  return request({
    url: 'api/department/delete',
    method: 'post',
    data: data
  })
}
