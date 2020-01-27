import React from 'react'
import PropTypes from 'prop-types'

import Container from '../Container'

import styles from './styles'

const Row = ({ children, style, ...rest }) => (
	<Container style={[styles.wrap, style]} {...rest}>
		{children}
	</Container>
)
Row.propTypes = {
	children: PropTypes.any,
	style: PropTypes.any,
}
Row.defaultProps = {
	children: null,
	style: {},
}

export default Row
