import { handleResponse } from './response'
const returnPromise = (arg) => {
  return new Promise((resolve, reject) => {
    if (arg === 1) {
      const res = {
        data: {
          code: 200,
          data: '200'
        }
      }
      resolve(res)
    } else if (arg === 2) {
      const res = {
        data: {
          code: 404,
          data: '404'
        }
      }
      resolve(res)
    } else {
      reject(Error('error'))
    }
  })
}
const testNode = {
  setState: (data) => {}
}
describe('utils/response', () => {
  it('test handleResponse', async () => {
    handleResponse(returnPromise(1), '编辑', testNode,
      'dataState', { modelState: true }, () => { console.log('success') },
      () => { console.log('finally') })
    handleResponse(returnPromise(2), '修改', testNode)
    handleResponse(returnPromise(3), '查看', testNode)
    handleResponse(returnPromise(1), '修改', testNode)
  })
})
