import { StyleSheet } from 'react-native'

import { colors, variables } from 'styles'

const styles = StyleSheet.create({
	wrap: {
		flexGrow: 1,
		flexShrink: 0,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: variables.field.paddingHorizontal,
		height: variables.field.height,
	},
	filled: {
		backgroundColor: colors.gray.lighten,
	},
	wrapStyled: {
		borderColor: colors.gray.light,
		borderRadius: variables.field.borderRadius,
		borderWidth: 1,
	},
	autoHeight: {
		paddingVertical: 10,
		height: 'auto',
	},
})

export default styles
