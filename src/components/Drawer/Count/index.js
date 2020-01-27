import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import { MainText } from '../../Typography'

import styles from './styles'

const Count = ({ value }) => (
	<View style={styles.count}>
		<MainText weight="bold" color="white.main">
			{value}
		</MainText>
	</View>
)
Count.propTypes = {
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}
Count.defaultProps = {
	value: null,
}

export default Count
