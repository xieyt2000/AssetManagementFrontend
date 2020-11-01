import app from './tagsView'
import * as types from '../action-types'
describe('reducers/app', () => {
  const testState = {
    taglist: []
  }
  const actionAdd = {
    type: types.TAGSVIEW_ADD_TAG,
    tag: '1'
  }
  const actionDelete = {
    type: types.TAGSVIEW_DELETE_TAG,
    tag: '1'
  }
  const actionEmpty = {
    type: types.TAGSVIEW_EMPTY_TAGLIST
  }
  const actionClose = {
    type: types.TAGSVIEW_CLOSE_OTHER_TAGS
  }
  const action = {
    type: ''
  }
  it('test app TAGSVIEW_ADD_TAG', () => {
    const res = app(testState, actionAdd)
    expect(res).toHaveProperty('taglist', ['1'])
  })
  it('test app TAGSVIEW_DELETE_TAG', () => {
    const res = app(testState, actionDelete)
    expect(res).toHaveProperty('taglist', [])
  })
  it('test app TAGSVIEW_EMPTY_TAGLIST', () => {
    const res = app(testState, actionEmpty)
    expect(res).toHaveProperty('taglist')
  })
  it('test app TAGSVIEW_CLOSE_OTHER_TAGS', () => {
    const res = app(testState, actionClose)
    expect(res).toHaveProperty('taglist')
  })
  it('test app default', () => {
    const res = app(testState, action)
    expect(res).toHaveProperty('taglist')
  })
})
