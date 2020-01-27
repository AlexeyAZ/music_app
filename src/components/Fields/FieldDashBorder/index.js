import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import styles from './styles'

import Dash from '../../Dash'

const FieldDashBorder = ({ style }) => {
	return (
		<View style={[styles.wrap, style]}>
			<Dash />
		</View>
	)
}

FieldDashBorder.propTypes = {
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}
FieldDashBorder.defaultProps = {
	style: {},
}

export default FieldDashBorder
