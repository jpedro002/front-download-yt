import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { useAuthStorage } from '@/hooks/useAuthStorage'

export const AuthLayout = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const { getUser } = useAuthStorage()

	useEffect(() => {
		const user = getUser()

		if (user?.jwt) {
			navigate('/')
		}
	}, [location.pathname, getUser, navigate])

	return (
		<div className="grid min-h-screen grid-cols-1 place-items-center antialiased">
			<Outlet />
		</div>
	)
}
