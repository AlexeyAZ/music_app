import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { PlayerButton } from 'components'

import { withPlayer } from 'hocs'

class MuteButton extends Component {
	handleButtonPress = async () => {
		const {
			isPlayerMuted,
			playbackInstance: { instance },
		} = this.props
		try {
			if (isPlayerMuted()) {
				await instance.setIsMutedAsync(false)
			} else {
				await instance.setIsMutedAsync(true)
			}
		} catch (error) {
			console.log(`MuteButton -> handleButtonPress ${error}`)
		}
	}

	getIconName = () => {
		const { isPlayerMuted } = this.props
		if (isPlayerMuted()) {
			return 'volume-up'
		}
		return 'volume-mute'
	}

	render() {
		const { size, style } = this.props
		return (
			<PlayerButton
				iconName={this.getIconName()}
				onPress={this.handleButtonPress}
				size={size}
				style={style}
			/>
		)
	}
}

MuteButton.propTypes = {
	style: PlayerButton.propTypes.style,
	size: PlayerButton.propTypes.size,
	playbackInstance: PropTypes.object.isRequired,
	isPlayerMuted: PropTypes.func.isRequired,
}
MuteButton.defaultProps = {
	style: PlayerButton.defaultProps.style,
	size: PlayerButton.defaultProps.size,
}

const mapStateToProps = ({ playbackInstance }) => ({
	playbackInstance,
})

export default compose(connect(mapStateToProps, null), withPlayer)(MuteButton)
