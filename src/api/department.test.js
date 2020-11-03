import { departmentList, addDepartment, deleteDepartment, editDepartment } from './department'
import '@/mock'
describe('department api test', function () {
  it('test departmentList', async function () {
    const res = await departmentList()
    expect(res.data.code).toBe(200)
  })
  it('test addDepartment', async function () {
    const res = await addDepartment({})
    expect(res.data.data).toBe('addDepartment')
  })
  it('test deleteDepartment', async function () {
    const res = await deleteDepartment({})
    expect(res.data.data).toBe('deleteDepartment')
  })
  it('test editDepartment', async function () {
    const res = await editDepartment({})
    expect(res.data.data).toBe('editDepartment')
  })
})
