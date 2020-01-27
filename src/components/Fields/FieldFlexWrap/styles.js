import { StyleSheet } from 'react-native'

import { colors, variables } from 'styles'

const styles = StyleSheet.create({
	wrap: {
		borderColor: colors.gray.light,
		borderRadius: variables.field.borderRadius,
		borderWidth: 1,
		overflow: 'hidden',
	},
	fillLight: {
		backgroundColor: 'white',
	},
	fillDark: {
		backgroundColor: colors.gray.lighten,
	},
})

export default styles
