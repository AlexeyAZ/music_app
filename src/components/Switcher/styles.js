import { StyleSheet } from 'react-native'
import { colors, theme, variables } from 'styles'

const styles = StyleSheet.create({
	wrap: {
		flexDirection: 'row',
		backgroundColor: 'white',
		borderRadius: 11,
	},
	button: {
		backgroundColor: 'white',
		borderColor: colors.gray.main,
		height: variables.switcher.height,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderTopWidth: 1,
		borderBottomWidth: 1,
		paddingHorizontal: 10,
	},
	leftButton: {
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
		borderLeftWidth: 1,
	},
	rightButton: {
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
		borderRightWidth: 1,
	},
	activeButton: {
		backgroundColor: theme.mainColor,
		borderColor: theme.mainColor,
	},
	buttonText: {
		textTransform: 'uppercase',
	},
})

export default styles
