import { StyleSheet } from 'react-native'
import { colors } from 'styles'

const avatarSize = 50

const styles = StyleSheet.create({
	wrap: {
		borderRadius: avatarSize,
		overflow: 'hidden',
		height: avatarSize,
		width: avatarSize,
	},
	image: {
		height: '100%',
		width: '100%',
	},
})

export default styles
