import React from 'react'
import PropTypes from 'prop-types'

import { MainText } from '../../Typography'

const FieldError = ({ message }) => (
	<MainText color="red.main" size="xxs">
		{message}
	</MainText>
)
FieldError.propTypes = {
	message: PropTypes.string,
}
FieldError.defaultProps = {
	message: null,
}

export default FieldError
