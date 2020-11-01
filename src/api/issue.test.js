import * as API from './issue'
import '@/mock'
describe('api/issue', function () {
  it('test applyRequire', async function () {
    const res = await API.applyRequire({})
    expect(res.data.data).toBe('applyRequire')
  })
  it('test applyFix', async function () {
    const res = await API.applyFix({})
    expect(res.data.data).toBe('applyFix')
  })
  it('test applyTransfer', async function () {
    const res = await API.applyTransfer({})
    expect(res.data.data).toBe('applyTransfer')
  })
  it('test applyReturn', async function () {
    const res = await API.applyReturn({})
    expect(res.data.data).toBe('applyReturn')
  })
  it('test issueToHandle', async function () {
    const res = await API.issueToHandle()
    expect(res.data.data).toBe('issueToHandle')
  })
})
