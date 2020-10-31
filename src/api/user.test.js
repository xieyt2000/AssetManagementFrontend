import { reqUserInfo, getUsers, deleteUser, lockUser,
  editUser, nameExist, addUser, changePassword } from './user'
import '@/mock'

describe('user api test', function () {
  it('test reqUserInfo', async function () {
    const res = await reqUserInfo()
    console.log(res)
  })
  it('test getUsers', async function () {
    const res = await getUsers()
    console.log(res)
  })
  it('test deleteUser', async function () {
    const res = await deleteUser({})
    console.log(res)
  })
  it('test lockUser', async function () {
    const res = await lockUser({})
    console.log(res)
  })
  it('test editUser', async function () {
    const res = await editUser({})
    console.log(res)
  })
  it('test nameExist', async function () {
    const res = await nameExist({})
    console.log(res)
  })
  it('test addUser', async function () {
    const res = await addUser({})
    console.log(res)
  })
  it('test changePassword', async function () {
    const res = await changePassword({})
    console.log(res)
  })
})
