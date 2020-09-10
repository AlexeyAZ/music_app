import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AsyncStorage, View } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { AuthSession } from 'expo'
import get from 'lodash/get'
import moment from 'moment'

import * as AuthUserModule from 'modules/auth'
import * as ModalModule from 'modules/modal'

import { Button } from 'components'
import { API_BASE_URL, API_CLIENT_ID } from 'constants'

import { axiosInstance } from 'helpers'

import { version } from '../../../package.json'

import styles from './styles'

// token NmYwMTQ1MWQtMDUxOC00MDFkLWE5ZGItYzk2ZDY3ZTNhNDg2

const ACCESS_TOKEN_NAME = 'access_token'
const REFRESH_TOKEN_NAME = 'refresh_token'
const EXPIRATION_DATE_NAME = 'expiration_date'

const SCREEN_AFTER_LOGIN = 'Test'

class Login extends Component {
	async componentDidMount() {
		const { setAuthTokens, refreshToken, navigation } = this.props
		const access_token = await AsyncStorage.getItem(ACCESS_TOKEN_NAME)
		const refresh_token = await AsyncStorage.getItem(REFRESH_TOKEN_NAME)
		const expiration_date = await AsyncStorage.getItem(EXPIRATION_DATE_NAME)
		if (Number(expiration_date) && +moment(Number(expiration_date)) < +moment()) {
			const refreshTokenResponse = await refreshToken({ params: { refresh_token } })
			await this.saveTokensToStorage(refreshTokenResponse)
			navigation.navigate(SCREEN_AFTER_LOGIN)
			return
		}
		if (access_token && refresh_token) {
			await setAuthTokens({ access_token, refresh_token })
			this.setAuthorizationHeader(access_token)
			navigation.navigate(SCREEN_AFTER_LOGIN)
			return
		}
		this.openWebView()
	}

	setAuthorizationHeader = token => {
		axiosInstance.defaults.headers.common.authorization = `Bearer ${token}`
	}

	saveTokensToStorage = async response => {
		console.log('saveTokensToStorage')
		const { setAuthTokens } = this.props
		const access_token = get(response, 'data.access_token')
		const refresh_token = get(response, 'data.refresh_token')
		const expires_in = get(response, 'data.expires_in')
		const expiration_date = String(+moment().add(expires_in, 's'))
		await AsyncStorage.setItem(ACCESS_TOKEN_NAME, access_token)
		await AsyncStorage.setItem(REFRESH_TOKEN_NAME, refresh_token)
		await AsyncStorage.setItem(EXPIRATION_DATE_NAME, expiration_date)
		await setAuthTokens({ access_token, refresh_token, expiration_date })
		this.setAuthorizationHeader(response.access_token)
		return true
	}

	openWebView = async () => {
		const { authUser } = this.props
		const redirectUrl = AuthSession.getRedirectUrl()
		const result = await AuthSession.startAsync({
			authUrl: `${API_BASE_URL}/oauth/authorize?client_id=${API_CLIENT_ID}&redirect_uri=${encodeURIComponent(
				redirectUrl
			)}`,
		})
		const code = get(result, 'params.code')
		if (code) {
			const authResponse = await authUser({ params: { code } })
			this.saveTokensToStorage(authResponse)
		}
	}

	render() {
		const { navigation } = this.props
		return (
			<View>
				<Button onPress={this.openWebView}>Login</Button>
				<Button onPress={() => navigation.navigate('Test')}>Go to test</Button>
			</View>
		)
	}
}
Login.propTypes = {
	navigation: PropTypes.object.isRequired,
	authUser: PropTypes.func.isRequired,
	setAuthTokens: PropTypes.func.isRequired,
	refreshToken: PropTypes.func.isRequired,
}

const mapStateToProps = ({ auth }) => ({ auth })

const mapDispatchToProps = dispatch => ({
	authUser: bindActionCreators(AuthUserModule.authUser, dispatch),
	setAuthTokens: bindActionCreators(AuthUserModule.setAuthTokens, dispatch),
	refreshToken: bindActionCreators(AuthUserModule.refreshToken, dispatch),
	openModal: bindActionCreators(ModalModule.openModal, dispatch),
	closeModal: bindActionCreators(ModalModule.closeModal, dispatch),
})

export default compose(connect(mapStateToProps, mapDispatchToProps), withNavigation)(Login)
