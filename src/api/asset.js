import request from '@/utils/request'

export function assetList () {
  return request({
    url: '/api/asset/list',
    method: 'get'
  })
}

export function personalAssetList () {
  return request({
    url: '/api/user/assets',
    method: 'get'
  })
}

export function availableAssetList () {
  return request({
    url: '/api/asset/available',
    method: 'get'
  })
}

export function assetQuery (query) {
  return request({
    url: '/api/asset/query',
    method: 'post',
    data: query
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
export function assetCategoryList () {
  return request({
    url: '/api/asset/category/tree',
    method: 'get'
  })
}

export function addAssetCategory (data) {
  return request({
    url: 'api/asset/category/add',
    method: 'post',
    data: data
  })
}

export function editAssetCategory (data) {
  return request({
    url: 'api/asset/category/edit',
    method: 'post',
    data: data
  })
}

export function deleteAssetCategory (data) {
  return request({
    url: 'api/asset/category/delete',
    method: 'post',
    data: data
  })
}

export function getAssetHistory (asset) {
  return request({
    url: '/api/asset/history',
    method: 'post',
    data: asset
  })
}

export function assetRequire (data) {
  return request({
    url: '/api/issue/require',
    method: 'post',
    data: data
  })
}

export function getCustomProp () {
  return request({
    url: '/api/asset/custom/list',
    method: 'get'
  })
}

export function editCustomProp (data) {
  return request({
    url: '/api/asset/custom/edit',
    method: 'post',
    data: data
  })
}

export function assetRetire (data) {
  return request({
    url: '/api/asset/retire',
    method: 'post',
    data: data
  })
}

export function assetAllocate (data) {
  return request({
    url: '/api/asset/allocate',
    method: 'post',
    data: data
  })
}
