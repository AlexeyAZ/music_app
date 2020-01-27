import { StyleSheet } from 'react-native'

import { variables } from 'styles'

const styles = StyleSheet.create({
	wrapWithOffsets: {
		paddingLeft: variables.layout.paddingHorizontal,
		paddingRight: variables.layout.paddingHorizontal,
	},
	wrapGreedy: {
		flex: 1,
	},
	contentContainerGreedy: {
		flexGrow: 1,
	},
})

export default styles
