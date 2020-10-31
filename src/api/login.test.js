import { reqLogin, reqLogout } from './login'
import '@/mock'
describe('login api test', function () {
  it('test reqLogin', async function () {
    const res = await reqLogin({})
    console.log(res)
  })
  it('test reqLogout', async function () {
    const res = await reqLogout({})
    console.log(res)
  })
})
