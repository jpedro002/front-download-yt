import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const loginSchema = z.object({
	email: z.string().email('E-mail inválido').min(4, 'E-mail inválido '),
	password: z.string().min(1, 'campo obrigatório'),
})

type LoginSchema = z.infer<typeof loginSchema>

export const Auth = () => {
	const [passwordVisibility, setPasswordVisibility] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
	})

	const onSubmit = async (data: LoginSchema) => {
		console.log(data)
		try {
			toast.success('Enviamos um link de autenticação para seu e-mail.', {
				action: {
					label: 'Reenviar',
					onClick: () => {
						onSubmit(data)
					},
				},
			})
		} catch (error) {
			toast.error('Credenciais inválidas.')
		}
	}

	return (
		<>
			<Helmet title="Login" />

			<Card className="mx-auto max-w-sm">
				<CardHeader>
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="grid gap-4">
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="m@example.com"
									{...register('email')}
								/>
								{errors.email?.message && (
									<span className="text-red-400">{errors.email?.message}</span>
								)}
							</div>
							<div className="relative space-y-2	">
								<Label htmlFor="password">Senha</Label>
								<Input
									id="password"
									type={passwordVisibility ? 'text' : 'password'}
									{...register('password')}
								/>
								{errors.password && (
									<span className="text-red-500">
										{errors.password?.message}
									</span>
								)}
								<div className="absolute right-0 top-6">
									<Button
										onClick={() => setPasswordVisibility((prev) => !prev)}
										type="button"
										size="icon"
										variant="ghost"
										className="hover:bg-transparent"
									>
										{passwordVisibility ? <EyeOff /> : <Eye />}
										<span className="sr-only">
											{passwordVisibility ? 'Ocultar senha' : 'Mostrar senha'}
										</span>
									</Button>
								</div>
							</div>
							<Button type="submit" className="w-full" disabled={isSubmitting}>
								Login
							</Button>
						</div>
					</form>
					<div className="mt-4 text-center text-sm">
						Don&apos;t have an account?{' '}
						<Link to="/register" className="underline">
							Sign up
						</Link>
					</div>
				</CardContent>
			</Card>
		</>
	)
}
