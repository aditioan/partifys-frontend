//a root reducer boilerplate
import { combineReducers } from 'redux'

import trackReducer from './trackReducer'

export default combineReducers({
  track: trackReducer,
})
