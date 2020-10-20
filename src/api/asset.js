import request from '@/utils/request'

export function assetList () {
  return request({
    url: '/asset/list',
    method: 'get'
  })
}

export function addAsset (assetArr) {
  return request({
    url: '/asset/add',
    method: 'post',
    data: assetArr
  })
}

export function editAsset (asset) {
  return request({
    uri: '/asset/edit',
    method: 'post',
    data: asset
  })
}
