import request from '@/utils/request'

export function assetList () {
  return request({
    url: '/api/asset/list',
    method: 'get'
  })
}

export function addAsset (assetArr) {
  return request({
    url: '/api/asset/add',
    method: 'post',
    data: { data: assetArr }
  })
}

export function editAsset (asset) {
  return request({
    url: '/api/asset/edit',
    method: 'post',
    data: asset
  })
}
