import { StyleSheet } from 'react-native'
import { variables } from 'styles'

const { header } = variables

const styles = StyleSheet.create({
	contentContainerStyle: {
		justifyContent: 'center',
		paddingTop: header.height,
		paddingBottom: 40,
	},
	logoWrap: {
		marginBottom: 36,
		marginLeft: 'auto',
		marginRight: 'auto',
		width: '80%',
	},
	imageWrap: {
		marginBottom: 50,
		marginLeft: 'auto',
		marginRight: 'auto',
		width: '90%',
	},
})

export default styles
