import { getDepartments } from './department'
import '@/mock'
const testNode = {
  setState: () => {}
}
describe('utils/department', () => {
  it('test getDepartments', async () => {
    await getDepartments(testNode)
  })
})
