import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Audio } from 'expo-av'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'

import * as PlaybackModule from 'modules/playback'

const withPlayer = WrappedComponent => {
	class WithPlayerHOC extends Component {
		handleTogglePlay = async (uri, trackId) => {
			const {
				playbackStatus: {
					status: { isPlaying },
					meta: { id: playbackId },
				},
			} = this.props
			const id = trackId || playbackId
			console.log('handleTogglePlay', id)
			if (!id) {
				return null
			}
			try {
				if (isPlaying) {
					if (this.isTrackActive(id)) {
						return this.handlePause()
					}
					return this.handlePlay(uri, id)
				}
				if (this.isTrackActive(id)) {
					return this.handleContinuePlay()
				}
				return this.handlePlay(uri, id)
			} catch (error) {
				console.log(`withPlayer -> handleSwitchPlay: ${error}`)
			}
		}

		handlePlay = async (uri, id, customInitialStatus) => {
			const {
				updatePlaybackStatus,
				playbackInstance: { instance },
			} = this.props
			try {
				await updatePlaybackStatus({ status: { isLoaded: false }, meta: { id } })

				const source = { uri }
				const initialStatus = this.getInitialPlayStatus(customInitialStatus)

				await instance.unloadAsync()

				// instance.setOnPlaybackStatusUpdate(this.handlePlaybackStatusUpdate)

				const status = await instance.loadAsync(source, initialStatus)
				await updatePlaybackStatus({ status, meta: { id } })
			} catch (error) {
				console.log(`withPlayer -> handlePlay: ${error}`)
			}
		}

		handlePause = async () => {
			const {
				updatePlaybackStatus,
				playbackInstance: { instance },
			} = this.props
			if (instance) {
				const status = await instance.pauseAsync()
				await updatePlaybackStatus({ status })
				return status
			}
		}

		handleContinuePlay = async () => {
			const {
				updatePlaybackStatus,
				playbackInstance: { instance },
			} = this.props
			if (instance) {
				const status = await instance.playAsync()
				await updatePlaybackStatus({ status })
				return status
			}
		}

		handlePlaybackStatusUpdate = status => {
			const {
				updatePlaybackStatus,
				playbackStatus: {
					meta: { id },
				},
			} = this.props
			if (!status.error) {
				updatePlaybackStatus({
					status: {
						uri: status.uri,
						positionMillis: status.positionMillis,
						durationMillis: status.durationMillis,
						shouldPlay: status.shouldPlay,
						isPlaying: status.isPlaying,
						isLoaded: status.isLoaded,
						isBuffering: status.isBuffering,
						rate: status.rate,
						isMuted: status.isMuted,
						volume: status.volume,
						shouldCorrectPitch: status.shouldCorrectPitch,
						progressUpdateIntervalMillis: status.progressUpdateIntervalMillis,
					},
					meta: {
						id,
					},
				})
			}
			if (status.error) {
				console.log(`FATAL PLAYER ERROR: ${status.error}`)
			}
		}

		handleToggleMute = async () => {
			const {
				updatePlaybackStatus,
				playbackStatus: {
					status: { isMuted },
				},
				playbackInstance: { instance },
			} = this.props
			if (instance) {
				const status = await instance.setIsMutedAsync(!isMuted)
				await updatePlaybackStatus({ status })
				return status
			}
		}

		createPlaybackInstance = () => {
			const { updatePlaybackInstance } = this.props
			const playbackInstance = new Audio.Sound()
			return updatePlaybackInstance(playbackInstance)
		}

		getTrackPosition = async () => {
			const {
				playbackInstance: { instance },
			} = this.props
			const status = await instance.getStatusAsync()

			const { positionMillis, durationMillis } = status
			if (positionMillis && durationMillis) {
				return positionMillis / durationMillis
			}
			return 0
		}

		getNextTrackIndex = tracks => {
			const {
				playbackStatus: {
					meta: { id: playbackId },
				},
			} = this.props
			const tracksCount = tracks.length
			const currentTrackIndex = tracks.findIndex(track => track.id === playbackId)
			if (tracksCount === currentTrackIndex + 1) {
				return 0
			}
			return currentTrackIndex + 1
		}

		getPreviousTrackIndex = tracks => {
			const {
				playbackStatus: {
					meta: { id: playbackId },
				},
			} = this.props
			const tracksCount = tracks.length
			const currentTrackIndex = tracks.findIndex(track => track.id === playbackId)
			if (currentTrackIndex - 1 < 0) {
				return tracksCount - 1
			}
			return currentTrackIndex - 1
		}

		getInitialPlayStatus = customStatus => {
			const {
				playbackStatus: {
					status: { rate, shouldCorrectPitch, volume, isMuted, progressUpdateIntervalMillis },
				},
			} = this.props
			const initialStatus = {
				shouldPlay: true,
				rate,
				shouldCorrectPitch,
				volume,
				isMuted,
				progressUpdateIntervalMillis,
				...customStatus,
			}
			return initialStatus
		}

		setPlaybackPosition = async position => {
			const {
				updatePlaybackStatus,
				playbackStatus: {
					status: { durationMillis },
				},
				playbackInstance: { instance },
			} = this.props
			if (instance) {
				const millis = durationMillis * position
				const status = await instance.setPositionAsync(millis)
				await updatePlaybackStatus({ status })
				return status
			}
		}

		isTrackActive = id => {
			const {
				playbackStatus: {
					meta: { id: playbackId },
				},
			} = this.props
			return id === playbackId
		}

		isPlayerMuted = () => {
			const {
				playbackStatus: {
					status: { isMuted },
				},
			} = this.props
			return isMuted
		}

		isPlayerPlayng = () => {
			const {
				playbackStatus: {
					status: { isPlaying },
				},
			} = this.props
			return isPlaying
		}

		render() {
			return (
				<WrappedComponent
					onPlay={this.handlePlay}
					onContinuePlay={this.handleContinuePlay}
					onTogglePlay={this.handleTogglePlay}
					onPause={this.handlePause}
					onToggleMute={this.handleToggleMute}
					createPlaybackInstance={this.createPlaybackInstance}
					getTrackPosition={this.getTrackPosition}
					getNextTrackIndex={this.getNextTrackIndex}
					getPreviousTrackIndex={this.getPreviousTrackIndex}
					setPlaybackPosition={this.setPlaybackPosition}
					isPlayerMuted={this.isPlayerMuted}
					isPlayerPlayng={this.isPlayerPlayng}
					{...this.props}
				/>
			)
		}
	}

	WithPlayerHOC.propTypes = {
		playbackStatus: PropTypes.object.isRequired,
		playbackInstance: PropTypes.object.isRequired,
		updatePlaybackInstance: PropTypes.func.isRequired,
		updatePlaybackStatus: PropTypes.func.isRequired,
	}

	const mapStateToProps = ({ playbackStatus, playbackInstance }) => ({
		playbackStatus,
		playbackInstance,
	})

	const mapDispatchToProps = dispatch => ({
		updatePlaybackInstance: bindActionCreators(PlaybackModule.updatePlaybackInstance, dispatch),
		updatePlaybackStatus: bindActionCreators(PlaybackModule.updatePlaybackStatus, dispatch),
	})

	return compose(connect(mapStateToProps, mapDispatchToProps))(WithPlayerHOC)
}

export default withPlayer
