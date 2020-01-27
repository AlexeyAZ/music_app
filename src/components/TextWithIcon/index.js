import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import { MainText } from '../Typography'
import SvgIcon from '../SvgIcon'
import Image from '../Image'

import styles from './styles'

const TextWithIcon = ({ style, svgIcon, iconSource, iconProps, text, textProps }) => {
	return (
		<View style={[styles.wrap, style]}>
			{svgIcon ? (
				<SvgIcon source={iconSource} {...iconProps} style={[styles.icon, iconProps.style]} />
			) : (
				<Image source={iconSource} {...iconProps} style={[styles.icon, iconProps.style]} />
			)}
			<MainText {...textProps}>{text}</MainText>
		</View>
	)
}

TextWithIcon.propTypes = {
	style: PropTypes.object,
	svgIcon: PropTypes.bool,
	text: PropTypes.string.isRequired,
	iconProps: PropTypes.object,
	textProps: PropTypes.object,
	iconSource: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}
TextWithIcon.defaultProps = {
	style: {},
	svgIcon: true,
	iconProps: {},
	textProps: {},
}

export default TextWithIcon
