import React from 'react'
import NativeDash from 'react-native-dash'
import PropTypes from 'prop-types'

import styles from './styles'

const Dash = ({ dashThickness, dashGap, style, dashColor }) => (
	<NativeDash
		dashThickness={dashThickness}
		dashGap={dashGap}
		style={[styles.dash, style]}
		dashColor={dashColor}
	/>
)
Dash.propTypes = {
	dashThickness: PropTypes.number,
	dashGap: PropTypes.number,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	dashColor: PropTypes.string,
}
Dash.defaultProps = {
	dashThickness: 1,
	dashGap: 4,
	style: {},
	dashColor: styles.dashColor.color,
}

export default Dash
