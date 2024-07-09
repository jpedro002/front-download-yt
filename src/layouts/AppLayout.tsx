import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { useAuthStorage } from '@/hooks/useAuthStorage'

export const AppLayout = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const { getUser } = useAuthStorage()

	useEffect(() => {
		const user = getUser()

		if (!user && location.pathname !== '/auth') {
			navigate('/auth')
		}
	}, [location.pathname, getUser, navigate])

	return (
		<div className="flex min-h-screen flex-col antialiased">
			<Outlet />
		</div>
	)
}
