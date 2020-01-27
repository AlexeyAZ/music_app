import { StyleSheet } from 'react-native'
import { theme } from 'styles'

const rowStyles = {
	flexDirection: 'row',
	alignItems: 'center',
}

const styles = StyleSheet.create({
	tableWithFixedHeadWrap: {
		flex: 1,
	},
	tableWithFixedHeadBody: {
		flex: 1,
	},
	row: {
		...rowStyles,
		height: 55,
	},
	headRow: {
		...rowStyles,
		height: 40,
	},
	column: {
		flexDirection: 'row',
		justifyContent: 'center',
		flex: 1,
	},
	underlay: {
		color: theme.mainColor,
	},
	underlayHead: {
		color: 'transparent',
	},
})

export default styles
