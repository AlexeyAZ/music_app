import get from 'lodash/get'

import axiosInstance from './axiosInstance'

const createActionTypes = actionType => {
	const typeState = actionType.split('_').reverse()
	let successType = null
	let errorType = null
	if (typeState[0].includes('REQUEST')) {
		successType = typeState
			.map((item, index) => (index === 0 ? 'SUCCESS' : item))
			.reverse()
			.join('_')
		errorType = typeState
			.map((item, index) => (index === 0 ? 'ERROR' : item))
			.reverse()
			.join('_')
	}
	return {
		startType: actionType,
		successType,
		errorType,
	}
}

const createAction = (type, prepareAction) => {
	const actionTypes = createActionTypes(type)
	const { startType, successType, errorType } = actionTypes

	const actionCreator = args => dispatch => {
		const data = get(args, 'data')
		const prepared = typeof prepareAction === 'function' ? prepareAction(data) : prepareAction
		dispatch({ type: startType, payload: args })

		const url = get(prepared, 'url')

		if (!url) {
			return new Promise(resolve => resolve(args))
		}

		const method = get(prepared, 'method', 'get')
		const axiosOptions = get(prepared, 'axiosOptions', {})
		const params = get(args, 'params', {})
		const axiosData = get(args, 'reqData', {})
		const config = { method, url, params, data: axiosData, ...axiosOptions }

		return axiosInstance(config)
			.then(response => {
				dispatch({ type: successType, payload: response.data })
				return response
			})
			.catch(error => {
				const errorCode = get(error, 'response.data.code')
				if (errorCode === 'UnauthorizedError') {
					// TODO add error handling
				}
				dispatch({ type: errorType, payload: error })
				return new Promise((resolve, reject) => reject(error))
			})
	}

	actionCreator.start = startType
	actionCreator.success = successType
	actionCreator.error = errorType

	return actionCreator
}

export default createAction
