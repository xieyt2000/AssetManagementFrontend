import React, { Component } from 'react'
import { Table, Tag } from 'antd'
// import { assetList } from '@/api/remoteSearch'

const columns = [
  {
    title: 'No.',
    dataIndex: 'no',
    key: 'no',
    width: 200
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'oname',
    width: 200
  },
  {
    title: '价格',
    dataIndex: 'price',
    key: 'price',
    width: 195,
    render: text => (`$${text}`)
  },
  {
    title: '状态',
    key: 'tag',
    dataIndex: 'tag',
    width: 100,
    // eslint-disable-next-line react/display-name
    render: (tag) => (
      <Tag color={tag === 'repairing' ? 'magenta' : 'green'} key={tag}>
        {tag}
      </Tag>
    )
  }
]

class AssetTable extends Component {
  // 这个变量是用来标志当前组件是否挂载
  _isMounted = false

  state = {
    list: [{
      key: '@increment',
      no: '1',
      name: '计算机',
      price: '1000',
      tag: 'working'
    }, {
      key: '@increment',
      no: '2',
      name: '显示器',
      price: '500',
      tag: 'repairing'
    }]
  }

  // fetchData = () => {
  //   assetList().then((response) => {
  //     const list = response.data.data.items.slice(0, 13)
  //     if (this._isMounted) {
  //       this.setState({ list })
  //     }
  //   })
  // }

  componentDidMount () {
    this._isMounted = true
    // this.fetchData()
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  render () {
    return (
      <Table
        columns={columns}
        dataSource={this.state.list}
        pagination={false}
      />
    )
  }
}

export default AssetTable
