import Constants from 'expo-constants'
import get from 'lodash/get'

const releaseChannel = get(Constants, 'manifest.releaseChannel', '')

const getEnv = () => {
	// eslint-disable-next-line no-undef
	if (__DEV__ || releaseChannel.includes('dev')) return 'development'
	return 'production'
}

const APP_ENV = getEnv()

const ENV = {
	development: {
		location: 'dev',
	},
	production: {
		location: 'prod',
	},
}

export default ENV[APP_ENV]
