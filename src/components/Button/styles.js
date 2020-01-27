import { StyleSheet } from 'react-native'

import { variables, colors } from 'styles'

const defaultBorderRadius = 10
const defaultBorderWidth = 2

const styles = StyleSheet.create({
	wrap: {
		flexShrink: 0,
		height: variables.field.height,
	},
	container: {
		backgroundColor: 'transparent',
		flex: 1,
		borderRadius: defaultBorderRadius,
	},
	borderContainer: {
		backgroundColor: 'white',
		borderRadius: defaultBorderRadius - defaultBorderWidth / 2,
		position: 'absolute',
		top: defaultBorderWidth,
		right: defaultBorderWidth,
		bottom: defaultBorderWidth,
		left: defaultBorderWidth,
	},
	gradient: {
		borderRadius: defaultBorderRadius,
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
	},
	transparentGradient: {
		opacity: 0,
	},
	disabled: {
		backgroundColor: colors.gray.dark,
		overflow: 'hidden',
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
	},
	content: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingLeft: variables.button.paddingHorizontal,
		paddingRight: variables.button.paddingHorizontal,
	},
	textLight: {
		color: 'white',
	},
	buttonShadow: {
		position: 'absolute',
		top: '-2%',
		left: '-3%',
		height: '116%',
		width: '106%',
	},
})

export default styles
