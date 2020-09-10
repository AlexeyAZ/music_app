import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'
import rootReducer from 'modules'

import rootSaga from 'sagas'

const sagaMiddleware = createSagaMiddleware()

const logger = createLogger({
	collapsed: true,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

// sagaMiddleware.run(rootSaga)

export { store }
