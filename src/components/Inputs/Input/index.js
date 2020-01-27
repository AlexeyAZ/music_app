import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TextInput } from 'react-native'

import styles from './styles'

class Input extends Component {
	render() {
		const { style, ...rest } = this.props
		return (
			<TextInput style={[styles.input, style]} {...rest} />
		)
	}
}
Input.propTypes = {
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}
Input.defaultProps = {
	style: {},
}

export default Input
