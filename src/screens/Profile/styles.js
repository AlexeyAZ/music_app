import { StyleSheet } from 'react-native'
import { theme, colors } from 'styles'

const styles = StyleSheet.create({
	avatarWrap: {
		alignItems: 'center',
	},
	avatar: {
		marginBottom: 10,
	},
	switcherWrap: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 20,
	},
	dropIcon: {
		marginRight: 12,
	},
	carColorDefault: {
		color: colors.gray.main,
	},
})

export default styles
