import { QueryClientProvider } from '@tanstack/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { queryClient } from './lib/reactQuery.ts'
import { router } from './router'

export const App = () => {
	return (
		<HelmetProvider>
			<Helmet titleTemplate="%s | Template" />
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
				<Toaster richColors />
			</QueryClientProvider>
		</HelmetProvider>
	)
}
