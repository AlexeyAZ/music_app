import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'

import { PlayerButton } from 'components'

import { withPlayer } from 'hocs'

import * as PlaybackModule from 'modules/playback'

class PlayButton extends Component {
	// shouldComponentUpdate(nextProps) {
	// 	const {
	// 		id: idNext,
	// 		playbackStatus: {
	// 			status: { isPlaying: isPlayingNext, isLoaded: isLoadedNext },
	// 			meta: { id: playbackIdNext },
	// 		},
	// 	} = nextProps
	// 	const {
	// 		id,
	// 		playbackStatus: {
	// 			status: { isPlaying, isLoaded },
	// 			meta: { id: playbackId },
	// 		},
	// 	} = this.props
	// 	if (
	// 		id !== idNext ||
	// 		isPlaying !== isPlayingNext ||
	// 		isLoaded !== isLoadedNext ||
	// 		playbackId !== playbackIdNext
	// 	) {
	// 		return true
	// 	}
	// 	return false
	// }

	getButtonIcon = () => {
		const {
			id,
			playbackStatus: {
				status: { isPlaying, isLoaded },
				meta: { id: playbackId },
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

	handleButtonPress = () => {
		const { uri, id, onTogglePlay } = this.props
		console.log('id', id)
		onTogglePlay(uri, id)
	}

	render() {
		console.log('render PlayButton')
		const { style, iconSize } = this.props
		return (
			<PlayerButton
				iconName={this.getButtonIcon()}
				style={style}
				iconSize={iconSize}
				onPress={this.handleButtonPress}
			/>
		)
	}
}

PlayButton.propTypes = {
	uri: PropTypes.string,
	id: PropTypes.string,
	style: PlayerButton.propTypes.style,
	iconSize: PlayerButton.propTypes.iconSize,
	onTogglePlay: PropTypes.func.isRequired,
	playbackStatus: PropTypes.object.isRequired,
}
PlayButton.defaultProps = {
	uri: null,
	id: null,
	style: PlayerButton.defaultProps.style,
	iconSize: PlayerButton.defaultProps.iconSize,
}

const mapStateToProps = ({ playbackStatus, playbackInstance }) => ({
	playbackStatus,
	playbackInstance,
})

const mapDispatchToProps = dispatch => ({
	updatePlaybackStatus: bindActionCreators(PlaybackModule.updatePlaybackStatus, dispatch),
	updatePlaybackInstance: bindActionCreators(PlaybackModule.updatePlaybackInstance, dispatch),
})

export default compose(connect(mapStateToProps, mapDispatchToProps), withPlayer)(PlayButton)
