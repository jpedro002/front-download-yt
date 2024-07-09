import { useNavigate } from 'react-router-dom'

interface getAuthReturn {
	jwt: string
}

export const useAuthStorage = () => {
	const navigate = useNavigate()

	const signin = ({ jwt }: { jwt: string }) => {
		localStorage.setItem(
			'APP_KEY',
			JSON.stringify({
				jwt,
			}),
		)
		navigate('/', { replace: true })
	}

	const signout = () => {
		localStorage.removeItem('APP_KEY')
		navigate('/auth', { replace: true })
	}

	const getUser = (): getAuthReturn | null => {
		const jwt = localStorage.getItem('APP_KEY')
		if (!jwt) return null
		else {
			return JSON.parse(jwt)
		}
	}

	return {
		signin,
		signout,
		getUser,
	}
}
