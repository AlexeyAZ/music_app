import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from 'modules'

const logger = createLogger({
	collapsed: true,
})

export const store = createStore(rootReducer, applyMiddleware(thunk, logger))
