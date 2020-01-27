import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import styles from './styles'

const FieldIcon = ({ children }) => {
	return <View style={styles.wrap}>{children}</View>
}

FieldIcon.propTypes = {
	children: PropTypes.any,
}
FieldIcon.defaultProps = {
	children: null,
}

export default FieldIcon
