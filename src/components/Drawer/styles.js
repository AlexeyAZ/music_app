import { StyleSheet, Platform } from 'react-native'

const styles = StyleSheet.create({
	wrap: {
		paddingTop: 20,
	},
	content: {
		paddingTop: Platform.OS === 'ios' ? 20 : 0,
	},
	userInfo: {
		alignItems: 'center',
	},
	avatar: {
		marginBottom: 8,
	},
	dash: {
		marginBottom: 10,
	},
	menuItem: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
	},
	image: {
		position: 'absolute',
		top: '110%',
		left: 0,
		width: '100%',
	},
	exitButtonWrap: {
		backgroundColor: 'white',
		alignItems: 'center',
		paddingVertical: 20,
	},
})

export default styles
