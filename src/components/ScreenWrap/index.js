import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SafeAreaView from 'react-native-safe-area-view'
import { Header } from 'react-navigation-stack'
// import { SafeAreaView } from 'react-native'

import KeyboardAvoiding from '../KeyboardAvoiding'

import styles from './styles'

class ScreenWrap extends Component {
	renderContent = () => {
		const { isKeyboardAvoiding, keyboardOffset, children } = this.props
		if (isKeyboardAvoiding) {
			return (
				<KeyboardAvoiding keyboardVerticalOffset={keyboardOffset ? Header.HEIGHT + 20 : 0}>
					{children}
				</KeyboardAvoiding>
			)
		}
		return children
	}

	render() {
		const { forceInset, style } = this.props
		return (
			<SafeAreaView style={[styles.safeContainer, style]} forceInset={{ top: 'never', ...forceInset }}>
				{this.renderContent()}
			</SafeAreaView>
		)
	}
}

ScreenWrap.propTypes = {
	isKeyboardAvoiding: PropTypes.bool,
	keyboardOffset: PropTypes.bool,
	forceInset: PropTypes.object,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	children: PropTypes.any,
}
ScreenWrap.defaultProps = {
	isKeyboardAvoiding: true,
	keyboardOffset: false,
	forceInset: {},
	style: {},
	children: null,
}

export default ScreenWrap
