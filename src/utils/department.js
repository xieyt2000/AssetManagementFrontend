import { departmentList } from '../api/department'

export const adaptDepartmentList = (departmentList) => {
  departmentList.forEach(item => {
    item.value = item.id
    item.label = item.name
    adaptDepartmentList(item.children)
  })
}
export const getDepartments = async (self) => {
  const res = await departmentList()
  const { data: departments, code } = res.data
  const newDepartments = [departments]
  adaptDepartmentList(newDepartments)
  if (code === 200) {
    self.setState({
      departmentList: newDepartments
    })
  }
}
