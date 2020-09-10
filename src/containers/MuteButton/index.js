import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { PlayerButton } from 'components'

import { withPlayer } from 'hocs'

class MuteButton extends Component {
	handleButtonPress = async () => {
		const { onToggleMute } = this.props
		onToggleMute()
	}

	getIconName = () => {
		const { isPlayerMuted } = this.props
		if (isPlayerMuted()) {
			return 'volume-up'
		}
		return 'volume-mute'
	}

	render() {
		const { iconSize, style } = this.props
		return (
			<PlayerButton
				iconName={this.getIconName()}
				onPress={this.handleButtonPress}
				iconSize={iconSize}
				style={style}
			/>
		)
	}
}

MuteButton.propTypes = {
	style: PlayerButton.propTypes.style,
	iconSize: PlayerButton.propTypes.iconSize,
	isPlayerMuted: PropTypes.func.isRequired,
	onToggleMute: PropTypes.func.isRequired,
}
MuteButton.defaultProps = {
	style: PlayerButton.defaultProps.style,
	iconSize: PlayerButton.defaultProps.iconSize,
}

const mapStateToProps = ({ playbackInstance }) => ({
	playbackInstance,
})

export default compose(connect(mapStateToProps, null), withPlayer)(MuteButton)
