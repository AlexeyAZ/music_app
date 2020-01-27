import React from 'react'
import PropTypes from 'prop-types'
import { Platform } from 'react-native'

import { fontSizes } from 'styles'

import { Input } from '../Inputs'

const Textarea = ({ numberOfLines, style, ...rest }) => {
	return (
		<Input
			multiline
			textAlignVertical="top"
			numberOfLines={Platform.OS === 'ios' ? null : numberOfLines}
			style={[Platform.OS === 'ios' ? { minHeight: numberOfLines * fontSizes.xs } : {}, style]}
			{...rest}
		/>
	)
}

Textarea.propTypes = {
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	numberOfLines: PropTypes.number,
}
Textarea.defaultProps = {
	style: {},
	numberOfLines: 4,
}

export default Textarea
