import { combineReducers } from 'redux'
import user from './user'
import app from './app'
import tagsView from './tagsView'
export default combineReducers({
  user,
  app,
  tagsView
})
