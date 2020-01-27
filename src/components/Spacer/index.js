import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

const Spacer = ({ size, horizontal }) => (
	<View style={[horizontal ? { width: size } : { height: size }]} />
)

Spacer.propTypes = {
	size: PropTypes.number.isRequired,
	horizontal: PropTypes.bool,
}
Spacer.defaultProps = {
	horizontal: false,
}

export default Spacer
