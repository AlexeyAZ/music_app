import React from 'react'
import PropTypes from 'prop-types'

import FieldError from '../FieldError'
import FieldWrap from '../FieldWrap'
import FieldContainer from '../FieldContainer'

const FieldItem = ({ styled, filled, autoHeight, error, children, style, innerWrapStyle }) => (
	<FieldContainer style={style}>
		<FieldWrap styled={styled} filled={filled} autoHeight={autoHeight} style={innerWrapStyle}>
			{children}
		</FieldWrap>
		{error && <FieldError message={error} />}
	</FieldContainer>
)

FieldItem.propTypes = {
	filled: PropTypes.bool,
	styled: PropTypes.bool,
	error: PropTypes.string,
	children: PropTypes.any,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	autoHeight: PropTypes.bool,
	innerWrapStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}
FieldItem.defaultProps = {
	filled: true,
	styled: true,
	error: null,
	children: null,
	style: {},
	autoHeight: false,
	innerWrapStyle: {},
}

export default FieldItem
