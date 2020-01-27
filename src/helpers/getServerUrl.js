import Constants from 'expo-constants'

import { API_LOCAL_SERVER_URL } from 'constants'

const { manifest } = Constants

const getServerUrl = () => {
	if (typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev) {
		return `http://${manifest.debuggerHost
			.split(`:`)
			.shift()
			.concat(`:5000`)}`
	}
	return API_LOCAL_SERVER_URL
}

export default getServerUrl
