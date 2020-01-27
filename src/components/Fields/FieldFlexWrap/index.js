import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'

const FieldFlexWrap = ({ fill, children }) => (
	<View style={[styles.wrap, fill === 'dark' ? styles.fillDark : styles.fillLight]}>{children}</View>
)

FieldFlexWrap.propTypes = {
	fill: PropTypes.oneOf(['dark', 'light']),
	children: PropTypes.any,
}
FieldFlexWrap.defaultProps = {
	fill: 'dark',
	children: null,
}

export default FieldFlexWrap
