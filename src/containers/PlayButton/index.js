import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'

import { PlayerButton } from 'components'

import { withPlayer } from 'hocs'

import * as PlaybackModule from 'modules/playback'
import * as SongsModule from 'modules/songs'

class PlayButton extends Component {
	getButtonIcon = () => {
		const {
			id,
			playbackStatus: {
				status: { isPlaying, isLoaded },
				track: { id: playbackId },
			},
		} = this.props
		if (!id) {
			if (isPlaying) return 'pause'
			if (!isLoaded) return 'redo-alt'
			return 'play'
		}
		if (id && id === playbackId) {
			if (isPlaying) return 'pause'
			if (!isLoaded) return 'redo-alt'
		}
		return 'play'
	}

	render() {
		const { style, size, uri, id, onPlay, onTogglePlay } = this.props
		return (
			<PlayerButton
				iconName={this.getButtonIcon()}
				style={style}
				size={size}
				onPress={() => onTogglePlay(uri, id)}
			/>
		)
	}
}

PlayButton.propTypes = {
	uri: PropTypes.string,
	id: PropTypes.string,
	style: PlayerButton.propTypes.style,
	size: PlayerButton.propTypes.size,
	onTogglePlay: PropTypes.func.isRequired,
	onPlay: PropTypes.func.isRequired,
	playbackStatus: PropTypes.object.isRequired,
}
PlayButton.defaultProps = {
	uri: null,
	id: null,
	style: PlayerButton.defaultProps.style,
	size: PlayerButton.defaultProps.size,
}

const mapStateToProps = ({ songs, playbackStatus, playbackInstance }) => ({
	songs,
	playbackStatus,
	playbackInstance,
})

const mapDispatchToProps = dispatch => ({
	updatePlaybackStatus: bindActionCreators(PlaybackModule.updatePlaybackStatus, dispatch),
	updatePlaybackInstance: bindActionCreators(PlaybackModule.updatePlaybackInstance, dispatch),
	getSongs: bindActionCreators(SongsModule.getSongs, dispatch),
})

export default compose(connect(mapStateToProps, mapDispatchToProps), withPlayer)(PlayButton)
