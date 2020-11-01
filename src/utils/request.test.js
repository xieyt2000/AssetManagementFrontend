import request from '@/utils/request'
describe('utils/request', () => {
  it('test request', () => {
    request({
      url: '/api/asset/123',
      method: 'get'
    })
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  })
})
