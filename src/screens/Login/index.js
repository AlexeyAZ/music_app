import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AsyncStorage, View } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { AuthSession } from 'expo'
import get from 'lodash/get'

import * as AuthUserModule from 'modules/auth'
import * as ModalModule from 'modules/modal'


import { Button } from 'components'
import { API_BASE_URL, API_CLIENT_ID } from 'constants'

import { axiosInstance } from 'helpers'

import { version } from '../../../package.json'

import styles from './styles'

// token NmYwMTQ1MWQtMDUxOC00MDFkLWE5ZGItYzk2ZDY3ZTNhNDg2

const ACCESS_TOKEN_NAME = 'access_token'

class Login extends Component {
	async componentDidMount() {
		const token = await AsyncStorage.getItem(ACCESS_TOKEN_NAME)
		if (token) {
			console.log(ACCESS_TOKEN_NAME, token)
			this.setAuthorizationHeader(token)
		}
	}

	setAuthorizationHeader = token => {
		axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`
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
			const response = await authUser({ params: { code } })
			await AsyncStorage.setItem(ACCESS_TOKEN_NAME, response.access_token)
			this.setAuthorizationHeader(response.access_token)
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
	authUser: PropTypes.func.isRequired,
	navigation: PropTypes.object.isRequired,
}

const mapStateToProps = ({ auth }) => ({ auth })

const mapDispatchToProps = dispatch => ({
	authUser: bindActionCreators(AuthUserModule.authUser, dispatch),
	logoutUser: bindActionCreators(AuthUserModule.logoutUser, dispatch),
	openModal: bindActionCreators(ModalModule.openModal, dispatch),
	closeModal: bindActionCreators(ModalModule.closeModal, dispatch),
})

export default compose(connect(mapStateToProps, mapDispatchToProps), withNavigation)(Login)
