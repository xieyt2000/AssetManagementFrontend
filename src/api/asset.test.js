import { assetList, addAsset, assetCollection, assetCategoryList, addAssetCategory
  , deleteAssetCategory, editAsset, editAssetCategory, getAssetHistory } from './asset'
import '@/mock'
describe('asset api test', function () {
  it('test assetList', async function () {
    const res = await assetList()
    console.log(res)
  })
  it('test addAsset', async function () {
    const res = await addAsset([])
    console.log(res)
  })
  it('test assetCollection', async function () {
    const res = await assetCollection({})
    console.log(res)
  })
  it('test assetCategoryList', async function () {
    const res = await assetCategoryList()
    console.log(res)
  })
  it('test deleteAssetCategory', async function () {
    const res = await deleteAssetCategory({})
    console.log(res)
  })
  it('test editAsset', async function () {
    const res = await editAsset({})
    console.log(res)
  })
  it('test editAssetCategory', async function () {
    const res = await editAssetCategory({})
    console.log(res)
  })
  it('test addAssetCategory', async function () {
    const res = await addAssetCategory({})
    console.log(res)
  })
  it('test getAssetHistory', async function () {
    const res = await getAssetHistory({})
    console.log(res)
  })
})
