import { reqLogin, reqLogout } from './login'
import '@/mock'
describe('login api test', function () {
  it('test reqLogin', async function () {
    const res = await reqLogin({})
    expect(res.data.data).toBe('login')
  })
  it('test reqLogout', async function () {
    const res = await reqLogout({})
    expect(res.data.data).toBe('logout')
  })
})
