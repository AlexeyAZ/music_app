import { StyleSheet } from 'react-native'
import { variables } from 'styles'

const {
	screens: { registration },
} = variables

const styles = StyleSheet.create({
	container: {
		...registration.container,
	},
	content: {
		...registration.content,
	},
	imageWrap: {
		justifyContent: 'flex-end',
	},
	image: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
	},
})

export default styles
