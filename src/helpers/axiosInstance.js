import axios from 'axios'

import { API_BASE_URL, API_BASE_VERSION } from 'constants'

const axiosInstance = axios.create({
	baseURL: `${API_BASE_URL}/${API_BASE_VERSION}/`,
	transformResponse: [function (data) {
		// Do whatever you want to transform the data
		if (data.toLowerCase().includes('error')) {
			console.log(`Axios instance error: ${data}`)
		}
		return JSON.parse(data);
	}],
})

export default axiosInstance
