import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Platform } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import size from 'lodash/size'

import styles from './styles'

class Select extends Component {
	handleValueChange = (value, index) => {
		const { name, onValueChange } = this.props
		return onValueChange(value, index, name)
	}

	getPlaceholder = () => {
		const { placeholder } = this.props
		const placeholderColor = styles.placeholder.color
		const defaultPlaceholder = {
			label: 'Выберите значение',
			value: null,
			color: placeholderColor,
		}
		if (!placeholder) {
			return defaultPlaceholder
		}
		if (typeof placeholder === 'object' && size(placeholder) === 0) {
			return {}
		}
		return { ...placeholder, color: placeholderColor }
	}

	render() {
		const { value, items, disabled } = this.props
		const placeholder = this.getPlaceholder()
		const defaultStyles = {
			headlessAndroidContainer: styles.headlessAndroidContainer,
			inputAndroid: styles.inputAndroid,
			inputIOS: styles.inputIOS,
			iconContainer: styles.iconContainer,
		}
		const selectStyles =
			Platform.OS === 'ios'
				? {
						...defaultStyles,
						viewContainer: styles.viewContainerIOS,
				  }
				: defaultStyles
		return (
			<RNPickerSelect
				disabled={disabled}
				value={value}
				items={items}
				style={selectStyles}
				placeholder={placeholder}
				useNativeAndroidPickerStyle={false}
				onValueChange={this.handleValueChange}
				Icon={() => <View style={[disabled ? styles.triangleIconDisabled : styles.triangleIcon]} />}
			/>
		)
	}
}
Select.propTypes = {
	items: PropTypes.array.isRequired,
	value: RNPickerSelect.propTypes.value,
	onValueChange: PropTypes.func.isRequired,
	name: PropTypes.string,
	placeholder: PropTypes.object,
	disabled: PropTypes.bool,
}
Select.defaultProps = {
	value: RNPickerSelect.defaultProps.value,
	name: null,
	placeholder: null,
	disabled: false,
}

export default Select
