import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import isNull from 'lodash/isNull'
import noop from 'lodash/noop'

import TouchableOpacity from '../TouchableOpacity'
import { MainText } from '../Typography'

import styles from './styles'

const SwitcherButton = ({ isActive, value, title, onButtonPress, style }) => {
	return (
		<TouchableOpacity
			onPress={() => onButtonPress(value)}
			style={[styles.button, isActive && styles.activeButton, style]}
		>
			<MainText
				family="montserrat"
				color={isActive && 'white.main'}
				weight="bold"
				size="xxs"
				style={styles.buttonText}
			>
				{title}
			</MainText>
		</TouchableOpacity>
	)
}

class Switcher extends Component {
	constructor(props) {
		super(props)

		this.state = {
			activeValue: props.defaultValue,
		}
	}

	handleButtonPress = value => {
		const { defaultValue, onButtonPress, options } = this.props
		const activeOptionsValue = options.find(option => option.value === value)
		if (!isNull(defaultValue)) {
			return this.setState({ activeValue: value }, () => onButtonPress(activeOptionsValue))
		}
		return onButtonPress(activeOptionsValue)
	}

	render() {
		const { activeValue: stateActiveValue } = this.state
		const { width, options, style, defaultValue, activeValue } = this.props
		const currentActiveValue = !isNull(defaultValue) ? stateActiveValue : activeValue
		return (
			<View style={[styles.wrap, { width }, style]}>
				{options.map(({ value, title }, index) => (
					<SwitcherButton
						key={value}
						style={index === 0 ? styles.leftButton : styles.rightButton}
						isActive={value === currentActiveValue}
						value={value}
						title={title}
						onButtonPress={this.handleButtonPress}
					/>
				))}
			</View>
		)
	}
}

Switcher.propTypes = {
	activeValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	options: PropTypes.array.isRequired,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	onButtonPress: PropTypes.func,
	width: PropTypes.number,
}
Switcher.defaultProps = {
	activeValue: null,
	defaultValue: null,
	style: {},
	onButtonPress: noop,
	width: 200,
}

export default Switcher
