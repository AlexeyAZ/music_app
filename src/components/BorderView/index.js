import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import styles from './styles'

const BorderView = ({ style, children }) => {
	return <View style={[styles.wrap, style]}>{children}</View>
}

BorderView.propTypes = {
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	children: PropTypes.any,
}
BorderView.defaultProps = {
	style: {},
	children: null,
}

export default BorderView
