import request from '@/utils/request'

export function assetList () {
  return request({
    url: '/asset/list',
    method: 'get'
  })
}
