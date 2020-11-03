import { getColumnSearchProps } from './table'
import '@/mock'
const testNode = {
  setState: () => {},
  searchInput: '',
  state: {
    searchColumn: 'time',
    searchText: ''
  }
}
describe('utils/table', () => {
  it('test getColumnSearchProps', async () => {
    testNode.state.searchColumn = 'time'
    let res = getColumnSearchProps('time', testNode, '时间')
    res.filterDropdown({
      setSelectedKeys: () => {},
      selectedKeys: ['0']
    })
    res.onFilter('', { time: [] })
    await res.onFilterDropdownVisibleChange(true)
    await res.onFilterDropdownVisibleChange(false)
    res.render(['0'])
    res.render('0')
    testNode.state.searchColumn = ''
    res = getColumnSearchProps('time', testNode, '时间')
    res.render(['0'])
  })
})
