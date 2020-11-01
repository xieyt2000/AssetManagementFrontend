import { renderIssueType, renderAssignee, renderIssueStatus } from './issue'
describe('utils/issue', () => {
  const row = {
    type_name: 'TRANSFER',
    status: 'DOING'
  }
  it('test renderIssueType', () => {
    renderIssueType((row))
  })
  it('test renderAssignee TRANSFER', () => {
    row.type_name = 'TRANSFER'
    renderAssignee(row)
  })
  it('test renderAssignee', () => {
    row.type_name = 'REQUIRE'
    renderAssignee(row)
  })
  it('test renderIssueStatus', () => {
    renderIssueStatus(row)
  })
})
