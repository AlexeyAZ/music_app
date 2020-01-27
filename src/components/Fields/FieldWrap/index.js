import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'

const FieldWrap = ({ styled, filled, children, autoHeight, style }) => (
	<View
		style={[
			styles.wrap,
			styled && styles.wrapStyled,
			filled && styles.filled,
			autoHeight && styles.autoHeight,
			style,
		]}
	>
		{children}
	</View>
)

FieldWrap.propTypes = {
	filled: PropTypes.bool,
	styled: PropTypes.bool,
	children: PropTypes.any,
	autoHeight: PropTypes.bool,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}
FieldWrap.defaultProps = {
	filled: false,
	styled: false,
	children: null,
	autoHeight: false,
	style: {},
}

export default FieldWrap
