import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Slider } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'

import { PlayerButton, SeekBar as SeekBarComponent } from 'components'

import { withPlayer } from 'hocs'

import * as PlaybackModule from 'modules/playback'

class SeekBar extends Component {
	state = {
		barValue: 0,
	}

	timerId = null
	// shouldComponentUpdate(nextProps) {
	// 	const {
	// 		playbackStatus: {
	// 			status: { positionMillis: nextPositionMillis, durationMillis: nextDurationMillis },
	// 		},
	// 	} = nextProps
	// 	const {
	// 		playbackStatus: {
	// 			status: { positionMillis, durationMillis },
	// 		},
	// 	} = this.props
	// 	if (positionMillis !== nextPositionMillis || durationMillis !== nextDurationMillis) {
	// 		return true
	// 	}
	// 	return false
	// }

	componentDidMount() {
		this.startBarAnimation()
	}

	// componentDidUpdate(prevProps) {
	// 	const {
	// 		playbackStatus: {
	// 			status: { isPlaying: isPlayingPrev },
	// 			meta: { id: prevId },
	// 		},
	// 	} = prevProps
	// 	const {
	// 		playbackStatus: {
	// 			status: { isPlaying },
	// 			meta: { id },
	// 		},
	// 	} = this.props
	// 	if (isPlaying !== isPlayingPrev || prevId !== id) {
	// 		if (this.timerId && isPlaying) {
	// 			this.startBarAnimation()
	// 		} else {
	// 			this.stopBarAnimation()
	// 		}
	// 	}
	// }

	componentWillUnmount() {
		this.stopBarAnimation()
	}

	startBarAnimation = () => {
		const { getTrackPosition } = this.props
		this.timerId = setInterval(async () => {
			const barValue = await getTrackPosition()
			this.setState({ barValue })
		}, 500)
	}

	stopBarAnimation = () => {
		if (this.timerId) {
			clearTimeout(this.timerId)
		}
	}

	handleSliderPress = ({ positionX }) => {
		const { setPlaybackPosition } = this.props
		setPlaybackPosition(positionX)
	}

	render() {
		const { barValue } = this.state
		return (
			<SeekBarComponent
				maximumValue={1}
				step={0.01}
				value={barValue}
				onPress={this.handleSliderPress}
			/>
		)
	}
}

SeekBar.propTypes = {
	getTrackPosition: PropTypes.func.isRequired,
	setPlaybackPosition: PropTypes.func.isRequired,
	playbackStatus: PropTypes.object.isRequired,
}

const mapStateToProps = ({ playbackStatus }) => ({
	playbackStatus,
})

const mapDispatchToProps = dispatch => ({
	updatePlaybackStatus: bindActionCreators(PlaybackModule.updatePlaybackStatus, dispatch),
})

export default compose(connect(mapStateToProps, mapDispatchToProps), withPlayer)(SeekBar)
