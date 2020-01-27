import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableWithoutFeedback } from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'
import noop from 'lodash/noop'
import moment from 'moment'

import { DATE_FORMAT } from 'constants'

import { MainText } from '../Typography'

import styles from './styles'

class DatePicker extends Component {
	constructor(props) {
		super(props)

		this.state = {
			show: false,
			activeValue: props.value || new Date(),
		}
	}

	handleDateChange = date => {
		const { value, onChange } = this.props
		if (value) {
			return this.setState({ show: false }, () => onChange(date))
		}
		return this.setState({ activeValue: date, show: false }, () => onChange(date))
	}

	handleInputPress = () => {
		this.setState({ show: true })
	}

	closeDatepicker = () => {
		this.setState({ show: false })
	}

	render() {
		const { show, activeValue } = this.state
		const { mode, value, formatValue } = this.props
		const dateValue = value
			? moment(value).format(formatValue)
			: moment(activeValue).format(formatValue)

		return (
			<>
				<DateTimePicker
					isVisible={show}
					date={new Date(activeValue)}
					mode={mode}
					is24Hour
					onCancel={this.closeDatepicker}
					onConfirm={this.handleDateChange}
				/>
				<TouchableWithoutFeedback style={styles.wrap} onPress={this.handleInputPress}>
					<MainText style={{ flex: 1 }}>{dateValue}</MainText>
				</TouchableWithoutFeedback>
			</>
		)
	}
}
DatePicker.propTypes = {
	mode: PropTypes.oneOf(['date', 'time']),
	onChange: PropTypes.func,
	value: PropTypes.object,
	formatValue: PropTypes.string,
}
DatePicker.defaultProps = {
	mode: 'date',
	onChange: noop,
	value: null,
	formatValue: DATE_FORMAT,
}

export default DatePicker
