import { reqUserInfo, getUsers, deleteUser, lockUser,
  editUser, nameExist, addUser, changePassword } from './user'
import '@/mock'

describe('user api test', function () {
  it('test reqUserInfo', async function () {
    const res = await reqUserInfo()
    expect(res.data.data).toBe('reqUserInfo')
  })
  it('test getUsers', async function () {
    const res = await getUsers()
    expect(res.data.data).toBe('getUsers')
  })
  it('test deleteUser', async function () {
    const res = await deleteUser({})
    expect(res.data.data).toBe('deleteUser')
  })
  it('test lockUser', async function () {
    const res = await lockUser({})
    expect(res.data.data).toBe('lockUser')
  })
  it('test editUser', async function () {
    const res = await editUser({})
    expect(res.data.data).toBe('editUser')
  })
  it('test nameExist', async function () {
    const res = await nameExist({})
    expect(res.data.data).toBe('nameExist')
  })
  it('test addUser', async function () {
    const res = await addUser({})
    expect(res.data.data).toBe('addUser')
  })
  it('test changePassword', async function () {
    const res = await changePassword({})
    expect(res.data.data).toBe('changePassword')
  })
})
