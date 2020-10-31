import { departmentList, addDepartment, deleteDepartment, editDepartment } from './department'
import '@/mock'
describe('department api test', function () {
  it('test departmentList', async function () {
    const res = await departmentList()
    console.log(res)
  })
  it('test addDepartment', async function () {
    const res = await addDepartment({})
    console.log(res)
  })
  it('test deleteDepartment', async function () {
    const res = await deleteDepartment({})
    console.log(res)
  })
  it('test editDepartment', async function () {
    const res = await editDepartment({})
    console.log(res)
  })
})
