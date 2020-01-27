import React from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import { FontAwesome5 } from '@expo/vector-icons'

import TouchableOpacity from '../../TouchableOpacity'

import styles from './styles'

const playerButtonSizes = {
	xxs: 30,
	xs: 40,
	s: 50,
	m: 60,
	l: 70,
	xl: 80,
	xxl: 90,
}

const PlayerButton = ({ iconName, size, children, style, disabled, onPress }) => {
	const buttonHeight = playerButtonSizes[size]
	const buttonWidth = playerButtonSizes[size]
	const iconSize = playerButtonSizes[size] - 10
	return (
		<TouchableOpacity
			disabled={disabled}
			style={[styles.wrap, { height: buttonHeight, width: buttonWidth }, style]}
			onPress={onPress}
		>
			{iconName ? <FontAwesome5 name={iconName} size={iconSize} /> : children}
		</TouchableOpacity>
	)
}

PlayerButton.propTypes = {
	disabled: PropTypes.bool,
	iconName: PropTypes.string,
	size: PropTypes.oneOf(Object.keys(playerButtonSizes)),
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	children: PropTypes.any,
	onPress: PropTypes.func,
}
PlayerButton.defaultProps = {
	disabled: false,
	iconName: null,
	size: 's',
	style: {},
	children: null,
	onPress: noop,
}

export default PlayerButton
