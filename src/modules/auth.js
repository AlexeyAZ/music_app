import { createAction, createReducer, getServerUrl } from 'helpers'

export const authUser = createAction('AUTH_USER_REQUEST', {
	url: '/login',
	axiosOptions: {
		baseURL: getServerUrl(),
	},
})
export const logoutUser = createAction('LOGOUT_USER_REQUEST', {
	url: '/simple/supported_vs_currenciesa',
})

const authModule = {
	auth: createReducer(authUser),
	logout: createReducer(logoutUser),
}

export default authModule
