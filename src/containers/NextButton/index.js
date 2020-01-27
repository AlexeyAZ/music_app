import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import debounce from 'lodash/debounce'

import { PlayerButton } from 'components'

import { withPlayer } from 'hocs'

import * as PlaybackModule from 'modules/playback'
import * as SongsModule from 'modules/songs'

class NextButton extends Component {
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
			getNextTrackIndex,
		} = this.props
		const nextTrackIndex = getNextTrackIndex(data)
		if (isPlaying) {
			return onPlay(data[nextTrackIndex].uri, data[nextTrackIndex].id)
		}
		return onPlay(data[nextTrackIndex].uri, data[nextTrackIndex].id, { shouldPlay: false })
	}

	render() {
		const { style, size } = this.props
		return (
			<PlayerButton
				iconName="fast-forward"
				style={style}
				size={size}
				onPress={this.handleButtonPress}
			/>
		)
	}
}

NextButton.propTypes = {
	uri: PropTypes.string,
	id: PropTypes.string,
	style: PlayerButton.propTypes.style,
	size: PlayerButton.propTypes.size,
	playbackStatus: PropTypes.object.isRequired,
	songs: PropTypes.object.isRequired,
	onPlay: PropTypes.func.isRequired,
	getSongs: PropTypes.func.isRequired,
	getNextTrackIndex: PropTypes.func.isRequired,
}
NextButton.defaultProps = {
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

export default compose(connect(mapStateToProps, mapDispatchToProps), withPlayer)(NextButton)
