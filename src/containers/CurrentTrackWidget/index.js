import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { withNavigation } from 'react-navigation'

import { PlayerButton } from 'components'

import PlayButton from '../PlayButton'
import MuteButton from '../MuteButton'
import PreviousButton from '../PreviousButton'
import NextButton from '../NextButton'
import SeekBar from '../SeekBar'

import styles from './styles'

const buttonSize = 'xxs'

class CurrentTrackWidget extends Component {
	handleOpenPlayer = () => {
		const { navigation } = this.props
		navigation.navigate('Player')
	}

	render() {
		return (
			<View>
				<View style={styles.wrap}>
					<PreviousButton size={buttonSize} />
					<PlayButton size={buttonSize} />
					<NextButton size={buttonSize} />
					<PlayerButton iconName="random" size={buttonSize} />
					{/* <PlayerButton iconName="list-ul" size={buttonSize} />
					<PlayerButton iconName="music" size={buttonSize} /> */}
					<MuteButton size={buttonSize} />
					<PlayerButton iconName="clone" size={buttonSize} onPress={this.handleOpenPlayer} />
				</View>
				<SeekBar />
			</View>
		)
	}
}

CurrentTrackWidget.propTypes = {
	navigation: PropTypes.object.isRequired,
}

export default withNavigation(CurrentTrackWidget)
