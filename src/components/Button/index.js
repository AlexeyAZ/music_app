import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, TouchableHighlight } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { shadowgiver } from 'shadowgiver'

import { fontSizes, theme } from 'styles'
import greenButtonShadow from 'assets/images/green-button-shadow.png'
import redButtonShadow from 'assets/images/red-button-shadow.png'

import { MainText } from '../Typography'
import Image from '../Image'

import styles from './styles'

const types = {
	main: {
		gradient: [theme.gradient.main.mainColor, theme.gradient.main.secondaryColor],
		text: theme.mainColor,
	},
	danger: {
		gradient: [theme.gradient.danger.mainColor, theme.gradient.danger.secondaryColor],
		text: theme.dangerColor,
	},
}

class Button extends Component {
	state = {
		active: false,
	}

	handleShowUnderlay = () => {
		const { disabled } = this.props
		if (!disabled) {
			this.setState({ active: true })
		}
	}

	handleHideUnderlay = () => {
		const { disabled } = this.props
		if (!disabled) {
			this.setState({ active: false })
		}
	}

	handlePress = () => {
		const { disabled, onPress, onPressDisabled } = this.props
		if (disabled) {
			return onPressDisabled()
		}
		return onPress()
	}

	getButtonOptions = () => {
		const { type } = this.props
		const buttonOptions = types[type]
		return buttonOptions
	}

	renderBorderContainer = () => {
		const { active } = this.state
		const { bordered } = this.props

		if (bordered) {
			if (!active) {
				return <View style={[styles.borderContainer]} />
			}
			return null
		}
		if (active) {
			return <View style={[styles.borderContainer]} />
		}
		return null
	}

	getTextStyle = () => {
		const { fontSize } = this.props
		const defaultTextStyle = {
			fontSize: fontSizes[fontSize],
		}
		const textColor = this.getTextColor()
		const textStyle = [{ ...defaultTextStyle, ...textColor }]
		return textStyle
	}

	getTextColor = () => {
		const { active } = this.state
		const { bordered, filled } = this.props
		const buttonOptions = this.getButtonOptions()
		const textDark = { color: buttonOptions.text }
		if (filled) {
			if (bordered) {
				if (active) {
					return styles.textLight
				}
				return textDark
			}

			if (active) {
				return textDark
			}

			return styles.textLight
		}
		return textDark
	}

	render() {
		const {
			style,
			shadow,
			filled,
			bordered,
			disabled,
			fontSize,
			children,
			onPress,
			onPressDisabled,
			...rest
		} = this.props

		const buttonOptions = this.getButtonOptions()
		const textStyle = this.getTextStyle()
		const containerStyle = { ...styles.container }

		return (
			<TouchableHighlight
				underlayColor="transparent"
				onPress={this.handlePress}
				onShowUnderlay={this.handleShowUnderlay}
				onHideUnderlay={this.handleHideUnderlay}
				activeOpacity={1}
				style={[styles.wrap, style]}
				{...rest}
			>
				<View style={containerStyle}>
					{shadow && <Image source={buttonOptions.shadow} style={styles.buttonShadow} />}
					<LinearGradient
						style={styles.gradient}
						colors={filled ? buttonOptions.gradient : ['white', 'white']}
						start={[1, 1]}
						end={[0, 0]}
					>
						{this.renderBorderContainer()}
					</LinearGradient>
					<View style={[styles.content]}>
						<MainText weight="bold" family="montserrat" style={textStyle}>
							{children}
						</MainText>
					</View>
				</View>
			</TouchableHighlight>
		)
	}
}
Button.propTypes = {
	type: PropTypes.oneOf(['main', 'danger']),
	style: PropTypes.any,
	shadow: PropTypes.bool,
	filled: PropTypes.bool,
	bordered: PropTypes.bool,
	disabled: PropTypes.bool,
	fontSize: PropTypes.oneOf(Object.keys(fontSizes)),
	children: PropTypes.any,
	onPress: PropTypes.func,
	onPressDisabled: PropTypes.func,
}
Button.defaultProps = {
	type: 'main',
	style: {},
	shadow: true,
	filled: true,
	bordered: false,
	disabled: false,
	fontSize: 's',
	children: null,
	onPress: () => {},
	onPressDisabled: () => {},
}

export default Button
