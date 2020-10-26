import { Tree, Input } from 'antd'
import React from 'react'
import { assetCategoryList } from '@/api/asset'
import HelpCard from '../../components/HelpCard'
// import ChangeDepartmentForm from './change-department-form'
import { getParentKey, expandTree, loop } from '../../utils/cascader'

const { Search } = Input

class AssetClassification extends React.Component {
  state = {
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true,
    assetCategories: [], // 有child的
    assetCategoriesList: [], // 展开的
    changeModalVis: false,
    changeModalLod: false,
    selectedDepartment: {
      id: '',
      name: ''
    }
  }

  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false
    })
  }

  onChange = e => {
    const { value } = e.target
    const { assetCategories, assetCategoriesList } = this.state
    const expandedKeys = assetCategoriesList
      .map(item => {
        if (item.name.indexOf(value) > -1) {
          return getParentKey(item.id, assetCategories)
        }
        return null
      })
      .filter((item, i, self) => item && self.indexOf(item) === i)
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true
    })
    console.log(expandedKeys)
  }

  componentDidMount () {
    this.getAssetCategoryList()
  }

  getAssetCategoryList = async () => {
    const res = await assetCategoryList()
    const { data: categoties, code } = res.data
    if (code === 200) {
      this.setState({
        assetCategories: [categoties]
      })
      const tmpAssetCategoriesList = []
      expandTree([categoties], tmpAssetCategoriesList)
      this.setState({
        assetCategoriesList: tmpAssetCategoriesList
      })
    }
  }

  render () {
    const { searchValue, expandedKeys, autoExpandParent, assetCategories } = this.state
    const description = '作为系统管理员，你可以浏览企业的部门组织结构，' +
        '通过左键点击部门名称来添加、修改、删除部门，下方的搜索框可以帮助你更快地定位部门'
    return (
      <div className='app-container'>
        <HelpCard title='部门管理' source={description}/>
        <br/>
        <div>
          <Search style={{ marginBottom: 8 }} placeholder="搜索" onChange={this.onChange}/>
          <Tree
            onExpand={this.onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            // onSelect={(selectedKeys, e) => {
            //   const selectedProps = e.node.props
            //   this.setState({
            //     changeModalVis: true,
            //     selectedDepartment: {
            //       id: selectedProps.eventKey,
            //       name: selectedProps.name
            //     }
            //   })
            // }}
            style={{ fontSize: '20px' }}
          >
            {loop(searchValue, assetCategories)}
          </Tree>
        </div>
      </div>
    )
  }
}

export default AssetClassification
