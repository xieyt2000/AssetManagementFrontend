import request from '@/utils/request'

export function reqUserInfo () {
  return request({
    url: '/api/user/info',
    method: 'post'
  })
}

export function getUsers () {
  return request({
    url: '/api/user/list',
    method: 'get'
  })
}

export function deleteUser (user) {
  return request({
    url: '/api/user/delete',
    method: 'post',
    data: user
  })
}

export function lockUser (user) {
  return request({
    url: '/api/user/lock',
    method: 'post',
    data: user
  })
}

export function editUser (user) {
  return request({
    url: '/api/user/edit',
    method: 'post',
    data: user
  })
}

export function nameExist (name) {
  return request({
    url: '/api/user/exist',
    method: 'post',
    data: { name: name }
  })
}

export function addUser (user) {
  return request({
    url: '/api/user/add',
    method: 'post',
    data: user
  })
}

export function changePassword (data) {
  return request({
    url: 'api/user/change-password',
    method: 'post',
    data: data
  })
}
