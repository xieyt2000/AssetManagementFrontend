import { assetList, addAsset, assetRequire, assetCategoryList, addAssetCategory
  , deleteAssetCategory, editAsset, editAssetCategory, getAssetHistory } from './asset'
import '@/mock'
describe('asset api test', function () {
  it('test assetList', async function () {
    const res = await assetList()
    expect(res.data.data).toBe('assetList')
  })
  it('test addAsset', async function () {
    const res = await addAsset([])
    expect(res.data.data).toBe('addAsset')
  })
  it('test assetRequire', async function () {
    const res = await assetRequire({})
    expect(res.data.data).toBe('assetRequire')
  })
  it('test assetCategoryList', async function () {
    const res = await assetCategoryList()
    expect(res.data.data).toBe('assetCategoryList')
  })
  it('test deleteAssetCategory', async function () {
    const res = await deleteAssetCategory({})
    expect(res.data.data).toBe('deleteAssetCategory')
  })
  it('test editAsset', async function () {
    const res = await editAsset({})
    expect(res.data.data).toBe('editAsset')
  })
  it('test editAssetCategory', async function () {
    const res = await editAssetCategory({})
    expect(res.data.data).toBe('editAssetCategory')
  })
  it('test addAssetCategory', async function () {
    const res = await addAssetCategory({})
    expect(res.data.data).toBe('addAssetCategory')
  })
  it('test getAssetHistory', async function () {
    const res = await getAssetHistory({})
    expect(res.data.data).toBe('getAssetHistory')
  })
})
