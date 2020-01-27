import colors from './colors'

const theme = {
	mainColor: colors.green.dark,
	dangerColor: colors.red.main,
	gradient: {
		main: {
			mainColor: colors.blue.light,
			secondaryColor: colors.green.lightest,
		},
		danger: {
			mainColor: colors.red.dark,
			secondaryColor: colors.red.light,
		},
	},
	shadow: {
		main: 'rgba(67, 230, 149, 0.5)',
		danger: 'rgba(250, 118, 118, 0.5)',
	},
	field: {
		placeholder: {
			color: colors.gray.main,
		},
	},
}

export default theme
