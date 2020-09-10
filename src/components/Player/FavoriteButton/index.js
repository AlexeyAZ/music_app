import React, { Component } from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

import PlayerButton from '../PlayerButton'

import styles from './styles'

class FavoriteButton extends Component {
	render() {
		const { active, iconSize, style, onPress } = this.props
		return <PlayerButton iconStyle={[active ? styles.active : styles.inActive]} iconName="heart" iconProps onPress={onPress} iconSize={iconSize} style={style} />
	}
}

FavoriteButton.propTypes = {
	active: PropTypes.bool,
	style: PlayerButton.propTypes.style,
	iconSize: PlayerButton.propTypes.iconSize,
	onPress: PropTypes.func,
}
FavoriteButton.defaultProps = {
	active: false,
	style: PlayerButton.defaultProps.style,
	iconSize: PlayerButton.defaultProps.iconSize,
	onPress: noop,
}

export default FavoriteButton
