import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'

import { PlayerButton } from 'components'

import { withPlayer } from 'hocs'

import * as PlaybackModule from 'modules/playback'

class PreviousButton extends Component {
	handleButtonPress = () => {
		const {
			activePlaylist: { tracks },
			playbackStatus: {
				status: { isPlaying },
			},
			onPlay,
			getPreviousTrackIndex,
		} = this.props
		const previousTrackIndex = getPreviousTrackIndex(tracks)
		if (isPlaying) {
			return onPlay(tracks[previousTrackIndex].uri, tracks[previousTrackIndex].id)
		}
		return onPlay(tracks[previousTrackIndex].uri, tracks[previousTrackIndex].id, {
			shouldPlay: false,
		})
	}

	render() {
		const { style, iconSize } = this.props
		return (
			<PlayerButton
				iconName="fast-backward"
				style={style}
				iconSize={iconSize}
				onPress={this.handleButtonPress}
			/>
		)
	}
}

PreviousButton.propTypes = {
	uri: PropTypes.string,
	id: PropTypes.string,
	activePlaylist: PropTypes.object.isRequired,
	style: PlayerButton.propTypes.style,
	iconSize: PlayerButton.propTypes.iconSize,
	playbackStatus: PropTypes.object.isRequired,
	onPlay: PropTypes.func.isRequired,
	getPreviousTrackIndex: PropTypes.func.isRequired,
}
PreviousButton.defaultProps = {
	uri: null,
	id: null,
	style: PlayerButton.defaultProps.style,
	iconSize: PlayerButton.defaultProps.iconSize,
}

const mapStateToProps = ({ activePlaylist, playbackStatus }) => ({
	activePlaylist,
	playbackStatus,
})

const mapDispatchToProps = dispatch => ({
	updatePlaybackStatus: bindActionCreators(PlaybackModule.updatePlaybackStatus, dispatch),
})

export default compose(connect(mapStateToProps, mapDispatchToProps), withPlayer)(PreviousButton)
