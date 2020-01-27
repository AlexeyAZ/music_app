import { StyleSheet } from 'react-native'
import { colors } from 'styles'

const styles = StyleSheet.create({
	count: {
		backgroundColor: colors.red.main,
		borderRadius: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: 10,
		height: 20,
		width: 20,
	},
})

export default styles
