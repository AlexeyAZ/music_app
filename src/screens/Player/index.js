import React, { Component, memo } from 'react'
import PropTypes from 'prop-types'
import { View, Slider } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { withNavigation } from 'react-navigation'

import { withPlayer } from 'hocs'
import { Spacer, MainText, PlayerButton } from 'components'
import { PlayButton, PreviousButton, NextButton, MuteButton, SeekBar } from 'containers'

import * as PlaybackModule from 'modules/playback'

import styles from './styles'

const tracksNavigationButtonSize = 'm'
const playerNavigationButtonSize = 'xs'

// eslint-disable-next-line react/prefer-stateless-function
class Player extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		const {
			playbackStatus: {
				status: { uri: nextUri },
			},
		} = nextProps
		const {
			playbackStatus: {
				status: { uri },
			},
		} = this.props
		if (nextUri !== uri) {
			return true
		}
		return false
	}

	render() {
		console.log('render')
		const {
			navigation,
			playbackStatus: {
				status: { uri },
			},
		} = this.props
		return (
			<View>
				<MainText align="center">{uri}</MainText>
				<Spacer size={10} />
				<View style={styles.tracksNavigation}>
					<PreviousButton size={tracksNavigationButtonSize} />
					<PlayButton style={styles.playButton} size={tracksNavigationButtonSize} />
					<NextButton size={tracksNavigationButtonSize} />
				</View>
				<Spacer size={10} />
				<SeekBar />
				<View style={styles.playerNavigation}>
					<PlayerButton
						iconName="list-ul"
						size={playerNavigationButtonSize}
						onPress={() => navigation.navigate('Playlist')}
					/>
					<MuteButton size={playerNavigationButtonSize} />
				</View>
			</View>
		)
	}
}

Player.propTypes = {
	navigation: PropTypes.object.isRequired,
	playbackStatus: PropTypes.object.isRequired,
}

const mapStateToProps = ({ playbackStatus }) => ({
	playbackStatus,
})

const mapDispatchToProps = dispatch => ({
	updatePlaybackStatus: bindActionCreators(PlaybackModule.updatePlaybackStatus, dispatch),
})

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withNavigation,
	withPlayer,
	memo
)(Player)
