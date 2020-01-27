import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import userIcon from 'assets/images/icon/user.png'

import Image from '../Image'
import styles from './styles'

const Avatar = ({ style, source }) => {
	return (
		<View style={[styles.wrap, style]}>
			{source ? (
				<Image source={source} style={styles.image} resizeMode="cover" />
			) : (
				<Image source={userIcon} style={styles.image} />
			)}
		</View>
	)
}

Avatar.propTypes = {
	source: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}
Avatar.defaultProps = {
	source: null,
	style: {},
}

export default Avatar
