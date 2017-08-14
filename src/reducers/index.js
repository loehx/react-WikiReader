import { combineReducers } from 'redux';

import WikiReducer from './wiki'
import AppReducer from './app'

export default combineReducers({
    app: AppReducer,
    wiki: WikiReducer
});