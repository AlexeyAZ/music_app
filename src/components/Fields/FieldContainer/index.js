import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'

const FieldContainer = ({ children, style }) => <View style={[styles.wrap, style]}>{children}</View>

FieldContainer.propTypes = {
	children: PropTypes.any,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}
FieldContainer.defaultProps = {
	children: null,
	style: {},
}

export default FieldContainer
