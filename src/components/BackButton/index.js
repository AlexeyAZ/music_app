import React from 'react'
import PropTypes from 'prop-types'
import { withNavigation, NavigationActions } from 'react-navigation'

import backButtonIcon from 'assets/images/icon/arrow-in-circle.png'

import TouchableOpacity from '../TouchableOpacity'
import Image from '../Image'
import { MainText } from '../Typography'
import styles from './styles'

const BackButton = ({ title, navigation, screen }) => {
	return (
		<TouchableOpacity
			style={styles.wrap}
			onPress={() =>
				screen ? navigation.navigate(screen) : navigation.goBack()
			}
		>
			<Image source={backButtonIcon} style={styles.icon} />
			<MainText family="montserrat">{title}</MainText>
		</TouchableOpacity>
	)
}

BackButton.propTypes = {
	navigation: PropTypes.object.isRequired,
	title: PropTypes.string,
	screen: PropTypes.string,
}
BackButton.defaultProps = {
	title: 'Обратно',
	screen: null,
}

export default withNavigation(BackButton)
