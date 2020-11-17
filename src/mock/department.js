import { getReturnFunc } from './utils'
const testDepartmentList =
  {
    id: 1,
    name: '1',
    children: [
      {
        id: 2,
        name: '2',
        children: []
      }
    ]
  }

export default {
  departmentList: () => {
    return {
      code: 200,
      data: testDepartmentList
    }
  },
  addDepartment: getReturnFunc('addDepartment'),
  deleteDepartment: getReturnFunc('deleteDepartment'),
  editDepartment: getReturnFunc('editDepartment')
}
