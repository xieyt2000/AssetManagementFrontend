import React from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'
import AssetTable from './index'

let div

beforeEach(() => {
  div = document.createElement('div')
  document.body.appendChild(div)
})

afterEach(() => {
  document.body.removeChild(div)
  div = null
})
test('AssetTable test', () => {
  // const role = [PERMISSION.IT, PERMISSION.ASSET, PERMISSION.SYSTEM, PERMISSION.STAFF]
  const ref = React.createRef()
  act(() => {
    ReactDOM.render(<AssetTable ref={ref}/>, div)
  })
  const assetTable = ref.current
  expect(assetTable.state.list[0].name).toBe('计算机')
  expect(assetTable._isMounted).toBe(true)
})
