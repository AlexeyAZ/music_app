import { variables } from 'styles'
import { Platform } from 'react-native'

const headerForceInset =
	Platform.OS === 'ios' ? { bottom: 'never' } : { top: 'never', bottom: 'never' }

const defaultOptions = {
	headerStyle: {
		borderBottomWidth: 0,
		elevation: 0,
		shadowOpacity: 0,
		shadowOffset: 0,
		shadowRadius: 0,
	},
	headerForceInset,
	headerLeftContainerStyle: {
		paddingLeft: variables.layout.paddingHorizontal,
	},
	headerRightContainerStyle: {
		paddingRight: variables.layout.paddingHorizontal,
	},
}

export default defaultOptions
