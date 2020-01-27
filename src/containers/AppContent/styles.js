import { StyleSheet, StatusBar } from 'react-native'

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	statusBar: {
		// eslint-disable-next-line no-undef
		backgroundColor: __DEV__ ? 'rgba(0,0,0,0.3)' : 'transparent',
		height: StatusBar.currentHeight,
	},
})

export default styles
