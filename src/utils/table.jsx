import { Input, Button, Icon } from 'antd'
import Highlighter from 'react-highlight-words'
import React from 'react'

const handleSearch = (selectedKeys, confirm, dataIndex, self) => {
  confirm()
  self.setState({
    searchText: selectedKeys[0],
    searchedColumn: dataIndex
  })
}

const handleReset = (clearFilters, self) => {
  clearFilters()
  self.setState({ searchText: '' })
}

const getFilterIcon = filtered => (
  <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
)

export const getColumnSearchProps = (dataIndex, self, name) => ({
  // eslint-disable-next-line react/prop-types,react/display-name
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
    <div style={{ padding: 8 }}>
      <Input
        ref={node => {
          self.searchInput = node
        }}
        placeholder={`搜索 ${name}`}
        value={selectedKeys[0]}
        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex, self)}
        style={{ width: 188, marginBottom: 8, display: 'block' }}
      />
      <Button
        type='primary'
        onClick={() => handleSearch(selectedKeys, confirm, dataIndex, self)}
        icon="search"
        size="small"
        style={{ width: 90, marginRight: 8, backgroundColor: '#1890ff' }}
      >
        搜索
      </Button>
      <Button onClick={() => handleReset(clearFilters, self)} size="small" style={{ width: 90 }}>
        重置
      </Button>
    </div>
  ),
  filterIcon: getFilterIcon,
  onFilter: (value, record) =>
    record[dataIndex]
      .toString()
      .toLowerCase()
      .includes(value.toLowerCase()),
  onFilterDropdownVisibleChange: visible => {
    if (visible) {
      setTimeout(() => self.searchInput.select())
    }
  },
  // eslint-disable-next-line react/display-name
  render: text => {
    if (text instanceof Array) {
      text = text.join('\n')
    }
    return self.state.searchedColumn === dataIndex ? (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[self.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ) : (
      text
    )
  }
})
