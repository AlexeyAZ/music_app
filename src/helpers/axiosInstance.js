import axios from 'axios'

import { API_BASE_URL, API_BASE_VERSION } from 'constants'

const axiosInstance = axios.create({
	baseURL: `${API_BASE_URL}/${API_BASE_VERSION}/`,
	headers: {
		authorization: 'Bearer NTNhOWY5NjktNGJiMS00ZjAzLWIyZjYtYzdmOGQ0YTEwNDli',
	},
})

export default axiosInstance
