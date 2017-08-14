import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'

import reducer from './reducers'
import fetchMiddleware from './middleware/fetch'

const middleware = applyMiddleware(fetchMiddleware(), createLogger())

export default createStore(reducer, middleware);