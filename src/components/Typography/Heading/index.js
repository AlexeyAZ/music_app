import React from 'react'
import PropTypes from 'prop-types'

import { fontSizes } from 'styles'

import MainText from '../MainText'

const Heading = ({ size, children, ...rest }) => (
	<MainText family="montserrat" weight="bold" size={size} {...rest}>
		{children}
	</MainText>
)
Heading.propTypes = {
	size: PropTypes.oneOf(Object.keys(fontSizes)),
	children: PropTypes.any,
}
Heading.defaultProps = {
	size: 'xl',
	children: null,
}

export default Heading
