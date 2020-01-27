import { Header } from 'react-navigation-stack'

const sideOffset = 20

const variables = {
	header: {
		height: Header.HEIGHT,
	},
	border: {
		radius: {
			default: 5,
		},
	},
	layout: {
		paddingHorizontal: sideOffset,
	},
	menu: {
		height: 75,
	},
	button: {
		verticalPadding: 16,
		paddingHorizontal: sideOffset,
	},
	field: {
		height: 50,
		borderRadius: 10,
		paddingHorizontal: 18,
		marginBottom: 13,
	},
	switcher: {
		height: 35,
	},
	borderView: {
		paddingHorizontal: 10,
	},
	screens: {
		registration: {
			container: {
				paddingTop: 40,
			},
			content: {
				height: 260,
				zIndex: 1,
			},
		},
	},
}

export default variables
