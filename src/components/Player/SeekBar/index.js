import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import noop from 'lodash/noop'

import TouchableOpacity from '../../TouchableOpacity'

import styles from './styles'

class SeekBar extends Component {
	barWidth = 0

	handleBarPress = e => {
		const { onPress } = this.props
		return onPress({ positionX: e.nativeEvent.locationX / this.barWidth })
	}

	onLayoutLoaded = ({
		nativeEvent: {
			layout: { width },
		},
	}) => {
		this.barWidth = width
	}

	render() {
		const { value } = this.props
		const barProgressStyle = { width: `${value * 100}%` }
		return (
			<TouchableOpacity
				onLayout={this.onLayoutLoaded}
				style={styles.wrap}
				onPress={this.handleBarPress}
			>
				<View style={[styles.barProgress, barProgressStyle]} />
			</TouchableOpacity>
		)
	}
}

SeekBar.propTypes = {
	value: PropTypes.number,
	onPress: PropTypes.func,
}
SeekBar.defaultProps = {
	value: 0,
	onPress: noop,
}

export default SeekBar

// class SeekBar extends Component {
// 	state = {
// 		shadowValue: 0,
// 	}

// 	barWidth = 0
// 	responderPressed = false
// 	responderStartLocationX = null
// 	responderReleaseLocationX = null

// 	handleBarPress = e => {
// 		console.log('handleBarPress', e)
// 		const { onPress } = this.props
// 		return onPress({ positionX: e.nativeEvent.locationX / this.barWidth })
// 	}

// 	handleResponderGrant = e => {
// 		this.responderPressed = true
// 		this.responderStartLocationX = e.nativeEvent.locationX
// 		console.log('handleResponderGrant', e.nativeEvent.locationX)
// 	}

// 	handleResponderMove = e => {
// 		// this.moveLocationX
// 		console.log('handleResponderMove', e.nativeEvent.locationX)
// 		this.setState({ shadowValue: e.nativeEvent.locationX / this.barWidth })
// 	}

// 	handleResponderRelease = e => {
// 		console.log('handleResponderRelease', e.nativeEvent.locationX)
// 		console.log('handleResponderRelease e', e.nativeEvent.locationX)
// 		const { onPress } = this.props
// 		this.responderPressed = false
// 		this.setState({ shadowValue: e.nativeEvent.locationX / this.barWidth })
// 		return onPress({ positionX: e.nativeEvent.locationX / this.barWidth })
// 	}

// 	handleLayoutLoaded = ({
// 		nativeEvent: {
// 			layout: { width },
// 		},
// 	}) => {
// 		this.barWidth = width
// 	}

// 	render() {
// 		const { shadowValue } = this.state
// 		const { value } = this.props
// 		const val = this.responderPressed ? shadowValue : value
// 		const barProgressStyle = { width: `${val * 100}%` }
// 		return (
// 			<View
// 				onStartShouldSetResponderCapture={e => true}
// 				onMoveShouldSetResponderCapture={e => true}
// 				onStartShouldSetResponder={e => true}
// 				onMoveShouldSetResponder={e => true}
// 				onResponderGrant={this.handleResponderGrant}
// 				onResponderMove={this.handleResponderMove}
// 				onResponderRelease={this.handleResponderRelease}
// 				onLayout={this.handleLayoutLoaded}
// 				style={styles.wrap}
// 			>
// 				<View style={[styles.barProgress, barProgressStyle]} />
// 			</View>
// 		)
// 	}
// }

// SeekBar.propTypes = {
// 	value: PropTypes.number,
// 	onPress: PropTypes.func,
// }
// SeekBar.defaultProps = {
// 	value: 0,
// 	onPress: noop,
// }

// export default SeekBar
