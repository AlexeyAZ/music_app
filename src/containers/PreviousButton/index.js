import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'

import { PlayerButton } from 'components'

import { withPlayer } from 'hocs'

import * as PlaybackModule from 'modules/playback'
import * as SongsModule from 'modules/songs'

class PreviousButton extends Component {
	componentDidMount() {
		const { getSongs } = this.props
		getSongs()
	}

	handleButtonPress = () => {
		const {
			songs: { data },
			playbackStatus: {
				status: { isPlaying },
			},
			onPlay,
			getPreviousTrackIndex,
		} = this.props
		const nextTrackIndex = getPreviousTrackIndex(data)
		if (isPlaying) {
			return onPlay(data[nextTrackIndex].uri, data[nextTrackIndex].id)
		}
		return onPlay(data[nextTrackIndex].uri, data[nextTrackIndex].id, { shouldPlay: false })
	}

	render() {
		const { style, size } = this.props
		return (
			<PlayerButton
				iconName="fast-backward"
				style={style}
				size={size}
				onPress={this.handleButtonPress}
			/>
		)
	}
}

PreviousButton.propTypes = {
	uri: PropTypes.string,
	id: PropTypes.string,
	style: PlayerButton.propTypes.style,
	size: PlayerButton.propTypes.size,
	playbackStatus: PropTypes.object.isRequired,
	songs: PropTypes.object.isRequired,
	onPlay: PropTypes.func.isRequired,
	getSongs: PropTypes.func.isRequired,
	getPreviousTrackIndex: PropTypes.func.isRequired,
}
PreviousButton.defaultProps = {
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

export default compose(connect(mapStateToProps, mapDispatchToProps), withPlayer)(PreviousButton)
