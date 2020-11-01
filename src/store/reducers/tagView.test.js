import app from './tagsView'
import * as types from '../action-types'
describe('reducers/app', () => {
  const testState = {
    taglist: []
  }
  const testState2 = {
    taglist: ['1']
  }
  const testState3 = {
    taglist: [
      {
        path: '/dashboard'
      }
    ]
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
  it('test tagView TAGSVIEW_ADD_TAG', () => {
    const res = app(testState, actionAdd)
    expect(res).toHaveProperty('taglist', ['1'])
  })
  it('test tagView TAGSVIEW_ADD_TAG2', () => {
    const res = app(testState2, actionAdd)
    expect(res).toHaveProperty('taglist')
  })
  it('test tagView TAGSVIEW_DELETE_TAG', () => {
    const res = app(testState2, actionDelete)
    expect(res).toHaveProperty('taglist', [])
  })
  it('test tagView TAGSVIEW_EMPTY_TAGLIST', () => {
    const res = app(testState3, actionEmpty)
    expect(res).toHaveProperty('taglist')
  })
  it('test tagView TAGSVIEW_CLOSE_OTHER_TAGS', () => {
    const res = app(testState3, actionClose)
    expect(res).toHaveProperty('taglist')
  })
  it('test tagView default', () => {
    const res = app(testState, action)
    expect(res).toHaveProperty('taglist')
  })
})
