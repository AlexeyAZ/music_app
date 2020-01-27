import { StyleSheet } from 'react-native'
import { fontFamilies, fontSizes, theme, colors } from 'styles'

const selectArrowHeight = 9
const selectArrowWidth = 10

const triangleIcon = {
	borderTopWidth: selectArrowHeight,
	borderRightWidth: selectArrowWidth / 2,
	borderBottomWidth: 0,
	borderLeftWidth: selectArrowWidth / 2,
	borderColor: 'transparent',
	borderTopColor: theme.mainColor,
	top: -2,
	height: 0,
	width: 0,
}

const defaultSelect = {
	fontFamily: `${fontFamilies.gotham}-Regular`,
	fontSize: fontSizes.xs,
	height: '100%',
}

const styles = StyleSheet.create({
	inputAndroid: defaultSelect,
	inputIOS: defaultSelect,
	iconContainer: {
		top: '50%',
	},
	viewContainerIOS: {
		flex: 1,
	},
	triangleIcon,
	triangleIconDisabled: {
		...triangleIcon,
		borderTopColor: colors.gray.dark,
	},
	placeholder: {
		color: theme.field.placeholder.color,
	},
	headlessAndroidContainer: {
		flex: 1,
	},
})

export default styles
