import axios, { AxiosError } from 'axios'

import { env } from '@/ENV'

const api = axios.create({
	baseURL: env.VITE_API_URL,
})
// withCredentials: true,

// api.interceptors.request.use(async (config) => {
// 	try {
// 		// const data = localStorage.getItem('APP_KEY')
// 		// if (data) {
// 		// 	const { jwt } = JSON.parse(data)
// 		// 	if (jwt) config.headers.Authorization = `Bearer ${jwt}`
// 		// }
// 		return config
// 	} catch (error) {
// 		return config
// 	}
// })

// api.interceptors.response.use(null, async (error: AxiosError) => {
// 	if (error?.response?.status === 403) {
// 		localStorage.removeItem('APP_KEY')
// 		window.location.reload()
// 	}
// 	if (error) throw error
// })

export { api }
