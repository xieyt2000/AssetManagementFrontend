import { assetList, addAsset, assetCategoryList, addAssetCategory
  , deleteAssetCategory, editAsset, editAssetCategory, getAssetHistory,
  assetQuery, personalAssetList, availableAssetList, getCustomProp,
  editCustomProp, assetRetire, assetAllocate } from './asset'
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
  it('test assetCategoryList', async function () {
    const res = await assetCategoryList()
    expect(res.data.code).toBe(200)
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
  it('test personalAssetList', async function () {
    const res = await personalAssetList()
    expect(res.data.data).toBe('personalAssetList')
  })
  it('test availableAssetList', async function () {
    const res = await availableAssetList()
    expect(res.data.data).toBe('availableAssetList')
  })
  it('test assetQuery', async function () {
    const res = await assetQuery({})
    expect(res.data.data).toBe('assetQuery')
  })
  it('test getCustomProp', async function () {
    const res = await getCustomProp()
    expect(res.data.data).toBe('getCustomProp')
  })
  it('test editCustomProp', async function () {
    const res = await editCustomProp({})
    expect(res.data.data).toBe('editCustomProp')
  })
  it('test assetRetire', async function () {
    const res = await assetRetire({})
    expect(res.data.data).toBe('assetRetire')
  })
  it('test assetAllocate', async function () {
    const res = await assetAllocate({})
    expect(res.data.data).toBe('assetAllocate')
  })
})
