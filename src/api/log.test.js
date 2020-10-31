import { getLog } from './log'
import '@/mock'
describe('log api test', function () {
  it('test getLog', async function () {
    const res = await getLog({})
    expect(res.data.data).toBe('getLog')
  })
})
