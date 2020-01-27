import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Slider } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'

import { PlayerButton, SeekBar as SeekBarComponent } from 'components'

import { withPlayer } from 'hocs'

import * as PlaybackModule from 'modules/playback'
import * as SongsModule from 'modules/songs'

class SeekBar extends Component {
	handleSliderPress = ({ positionX }) => {
		const { setPlaybackPosition } = this.props
		setPlaybackPosition(positionX)
	}

	render() {
		const { getTrackPosition } = this.props
		return (
			<SeekBarComponent
				maximumValue={1}
				step={0.01}
				value={getTrackPosition()}
				onPress={this.handleSliderPress}
			/>
		)
	}
}

SeekBar.propTypes = {
	uri: PropTypes.string,
	id: PropTypes.string,
	style: PlayerButton.propTypes.style,
	size: PlayerButton.propTypes.size,
	playbackStatus: PropTypes.object.isRequired,
	songs: PropTypes.object.isRequired,
	onPlay: PropTypes.func.isRequired,
	getSongs: PropTypes.func.isRequired,
	getTrackPosition: PropTypes.func.isRequired,
	setPlaybackPosition: PropTypes.func.isRequired,
}
SeekBar.defaultProps = {
	uri: null,
	id: null,
	style: PlayerButton.defaultProps.style,
	size: PlayerButton.defaultProps.size,
}

const mapStateToProps = ({ songs, playbackStatus }) => ({
	songs,
	playbackStatus,
})

const mapDispatchToProps = dispatch => ({
	updatePlaybackStatus: bindActionCreators(PlaybackModule.updatePlaybackStatus, dispatch),
	getSongs: bindActionCreators(SongsModule.getSongs, dispatch),
})

export default compose(connect(mapStateToProps, mapDispatchToProps), withPlayer)(SeekBar)
