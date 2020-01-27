import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TextInputMask } from 'react-native-masked-text'
import noop from 'lodash/noop'

import styles from './styles'
import maskOptions from './maskOptions'

class InputMask extends Component {
	handleChangeText = (maskedText, rawText) => {
		const { type, onChangeText } = this.props
		if (type === 'custom') {
			return onChangeText(rawText)
		}
		return onChangeText(maskedText, rawText)
	}

	static maskOptions = maskOptions

	render() {
		const { style, type, onChangeText, ...rest } = this.props
		return (
			<TextInputMask
				includeRawValueInChangeText
				type={type}
				style={[styles.input, style]}
				onChangeText={this.handleChangeText}
				{...rest}
			/>
		)
	}
}
InputMask.propTypes = {
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	type: PropTypes.string,
	onChangeText: PropTypes.func,
}
InputMask.defaultProps = {
	style: {},
	type: 'custom',
	onChangeText: noop,
}

export default InputMask
