import { getList } from './list'
const res200 = {
  data: {
    data: '200',
    code: 200
  }
}
const res404 = {
  data: {
    data: '404',
    code: 404
  }
}
const testApi200 = () => {
  return new Promise((resolve, reject) => {
    resolve(res200)
  })
}
const testApi404 = () => {
  return new Promise((resolve, reject) => {
    resolve(res404)
  })
}
const testNode = {
  setState: () => {}
}
describe('utils/list', () => {
  it('test getList', () => {
    getList(testApi200, testNode, 'listName')
    getList(testApi200, testNode, null)
    getList(testApi404, testNode, null)
  })
})
