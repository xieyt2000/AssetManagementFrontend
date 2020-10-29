import { Tree, Input } from 'antd'
import React from 'react'
import { assetCategoryList } from '@/api/asset'
import HelpCard from '../../components/HelpCard'
import ChangeCategoryForm from './change-category-form'
import { getParentKey, expandTree, loop } from '../../utils/tree'

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
    selectedCategory: {
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

  onChange = (e) => {
    const value = e.target.value
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
      autoExpandParent: true,
      searchValue: value,
      expandedKeys
    })
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
    const description = '作为IT管理员，你可以管理资产的层级分类树，' +
        '通过左键点击分类来添加、修改、删除分类，下方的搜索框可以帮助你更快地定位分类'
    return (
      <div className='app-container'>
        <HelpCard title='资产分类' source={description}/>
        <br/>
        <div>
          <Search style={{ marginBottom: 8 }} placeholder="搜索" onChange={this.onChange}/>
          <Tree
            onExpand={this.onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            onSelect={(selectedKeys, e) => {
              const selectedProps = e.node.props
              this.setState({
                changeModalVis: true,
                selectedCategory: {
                  id: selectedProps.eventKey,
                  name: selectedProps.name
                }
              })
            }}
            style={{ fontSize: '20px', cursor: 'pointer' }}
          >
            {loop(searchValue, assetCategories)}
          </Tree>
        </div>
        <ChangeCategoryForm
          wrappedComponentRef={(formRef) => {
            this.changeFormRef = formRef
          }}
          visible={this.state.changeModalVis}
          confirmLoading={this.state.changeModalLod}
          onCancel={() => {
            this.setState({
              changeModalVis: false
            })
          }}
          onEdit={this.handleOkEdit}
          onAdd={this.handleOkAdd}
          onDelete={this.handleOkDelete}
          category={this.state.selectedCategory}
        >
        </ChangeCategoryForm>
      </div>
    )
  }
}

export default AssetClassification
