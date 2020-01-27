import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
	listRow: {
		flex: 1,
		color: 'white',
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
		borderBottomWidth: 1,
	},
	listPlayIcon: {
		marginRight: 10,
	},
	listContent: {
		flexGrow: 1,
		flexShrink: 1,
		paddingRight: 10,
	},
	duration: {
		marginLeft: 'auto',
	},
})

export default styles
