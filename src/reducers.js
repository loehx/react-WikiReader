import { combineReducers } from 'redux';

import WikiReducer from './reducers.wiki'

export default combineReducers({
    wiki: WikiReducer
});