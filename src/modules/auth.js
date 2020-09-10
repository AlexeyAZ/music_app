import { createAction, createReducer, getServerUrl } from 'helpers'

export const authUser = createAction('AUTH_USER_REQUEST', {
	url: '/auth',
	axiosOptions: {
		baseURL: getServerUrl(),
	},
})

export const refreshToken = createAction('REFRESH_TOKEN_REQUEST', {
	url: '/refresh-token',
	axiosOptions: {
		baseURL: getServerUrl(),
	},
})

export const setAuthTokens = createAction('SET_AUTH_TOKENS')

const authModule = {
	auth: createReducer(authUser),
	authTokens: createReducer(setAuthTokens, {
		initialState: {
			access_token: null,
			refresh_token: null,
		},
		customTypes: {
			[setAuthTokens.start]: (state, payload) => {
				return {
					...state,
					access_token: payload.access_token,
					refresh_token: payload.refresh_token,
					expiration_date: payload.expiration_date,
				}
			},
		},
	}),
}

export default authModule
