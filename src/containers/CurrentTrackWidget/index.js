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
					<PreviousButton iconSize={buttonSize} />
					<PlayButton iconSize={buttonSize} />
					<NextButton iconSize={buttonSize} />
					<PlayerButton iconName="random" iconSize={buttonSize} />
					{/* <PlayerButton iconName="list-ul" iconSize={buttonSize} />
					<PlayerButton iconName="music" iconSize={buttonSize} /> */}
					<MuteButton iconSize={buttonSize} />
					<PlayerButton iconName="clone" iconSize={buttonSize} onPress={this.handleOpenPlayer} />
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
