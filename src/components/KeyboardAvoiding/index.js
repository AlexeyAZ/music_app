import React from 'react'
import PropTypes from 'prop-types'
import { KeyboardAvoidingView } from 'react-native'

import styles from './styles'

const KeyboardAvoiding = ({ style, children, ...rest }) => (
	<KeyboardAvoidingView behavior="padding" style={[styles.wrap, style]} {...rest}>
		{children}
	</KeyboardAvoidingView>
)
KeyboardAvoiding.propTypes = {
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	children: PropTypes.any,
}
KeyboardAvoiding.defaultProps = {
	style: {},
	children: null,
}

export default KeyboardAvoiding
