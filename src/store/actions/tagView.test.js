import * as Action from './tagsView'
import * as types from '../action-types'
describe('actions/tagsView', () => {
  it('test addTag', () => {
    const action = Action.addTag()
    expect(action).toHaveProperty('type', types.TAGSVIEW_ADD_TAG)
  })
  it('test emptyTaglist', () => {
    const action = Action.emptyTaglist()
    expect(action).toHaveProperty('type', types.TAGSVIEW_EMPTY_TAGLIST)
  })
  it('test deleteTag', () => {
    const action = Action.deleteTag()
    expect(action).toHaveProperty('type', types.TAGSVIEW_DELETE_TAG)
  })
  it('test closeOtherTags', () => {
    const action = Action.closeOtherTags()
    expect(action).toHaveProperty('type', types.TAGSVIEW_CLOSE_OTHER_TAGS)
  })
})
