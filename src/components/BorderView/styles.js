import { StyleSheet } from 'react-native'
import { colors, variables } from 'styles'

const styles = StyleSheet.create({
	wrap: {
		borderColor: colors.gray.main,
		borderWidth: 1,
		borderRadius: variables.border.radius.default,
		borderStyle: 'dashed',
		paddingHorizontal: variables.borderView.paddingHorizontal,
	},
})

export default styles
