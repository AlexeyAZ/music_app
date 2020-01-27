import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import { Text } from 'react-native'

import {
	colors,
	fontSizes,
	fontWeights,
	fontWeightsAsText,
	fontStylesAsText,
	fontStyles,
	fontFamilies,
} from 'styles'

const createFontFamily = (family, weight, style) => {
	if (style) {
		return `${family}-${style}`
	}
	if (weight) {
		return `${family}-${weight}`
	}
	return family
}

const MainText = ({
	mb,
	align,
	size,
	weight,
	family,
	fontStyle,
	color,
	style,
	children,
	...rest
}) => {
	const fontWeight = fontWeightsAsText[weight]
	const customFontStyle = fontStyle && fontStylesAsText[fontStyle]
	const customFontFamily = createFontFamily(fontFamilies[`${family}`], fontWeight, customFontStyle)

	return (
		<Text
			style={[
				{
					color: color ? get(colors, color) : colors.black.main,
					fontSize: size ? fontSizes[size] : fontSizes.s,
					fontFamily: customFontFamily,
					textAlign: align,
					marginBottom: mb,
				},
				style,
			]}
			{...rest}
		>
			{children}
		</Text>
	)
}
MainText.propTypes = {
	mb: PropTypes.number,
	align: PropTypes.oneOf(['left', 'center', 'right']),
	size: PropTypes.oneOf(Object.keys(fontSizes)),
	weight: PropTypes.oneOf(Object.keys(fontWeights)),
	family: PropTypes.oneOf(Object.keys(fontFamilies)),
	fontStyle: PropTypes.oneOf(Object.keys(fontStyles)),
	color: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	children: PropTypes.any,
}
MainText.defaultProps = {
	mb: 0,
	align: 'left',
	size: 'xs',
	weight: 'normal',
	family: 'gotham',
	fontStyle: null,
	color: 'black.main',
	style: {},
	children: null,
}

export default MainText
