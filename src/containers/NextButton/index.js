import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'

import { PlayerButton } from 'components'

import { withPlayer } from 'hocs'

import * as PlaybackModule from 'modules/playback'

class NextButton extends Component {
	handleButtonPress = () => {
		const {
			activePlaylist: { tracks },
			playbackStatus: {
				status: { isPlaying },
			},
			onPlay,
			getNextTrackIndex,
		} = this.props
		const nextTrackIndex = getNextTrackIndex(tracks)
		if (isPlaying) {
			return onPlay(tracks[nextTrackIndex].previewURL, tracks[nextTrackIndex].id)
		}
		return onPlay(tracks[nextTrackIndex].previewURL, tracks[nextTrackIndex].id, { shouldPlay: false })
	}

	render() {
		console.log('render NextButton')
		const { style, iconSize } = this.props
		return (
			<PlayerButton
				iconName="fast-forward"
				style={style}
				iconSize={iconSize}
				onPress={this.handleButtonPress}
			/>
		)
	}
}

NextButton.propTypes = {
	id: PropTypes.string,
	style: PlayerButton.propTypes.style,
	iconSize: PlayerButton.propTypes.iconSize,
	playbackStatus: PropTypes.object.isRequired,
	activePlaylist: PropTypes.object.isRequired,
	onPlay: PropTypes.func.isRequired,
	getNextTrackIndex: PropTypes.func.isRequired,
}
NextButton.defaultProps = {
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

export default compose(connect(mapStateToProps, mapDispatchToProps), withPlayer)(NextButton)
