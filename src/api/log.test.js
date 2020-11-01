import { getLog } from './log'
import '@/mock'
describe('log api test', function () {
  it('test getLog', async function () {
    const res = await getLog({})
    console.log(res.data.data)
    expect(res.data.data[0].username).toBe('admin')
  })
})
