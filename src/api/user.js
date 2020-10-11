import request from '@/utils/request'

export function reqUserInfo () {
  return request({
    url: '/user/info',
    method: 'post'
  })
}

export function getUsers () {
  return request({
    url: '/user/list',
    method: 'get'
  })
}

export function deleteUser (user) {
  return request({
    url: '/user/delete',
    method: 'post',
    data: user
  })
}

export function editUser (user) {
  return request({
    url: '/user/edit',
    method: 'post',
    data: user
  })
}

export function nameExist (name) {
  return request({
    url: '/user/exist',
    method: 'post',
    data: { name: name }
  })
}

export function addUser (user) {
  return request({
    url: '/user/add',
    method: 'post',
    data: user
  })
}
