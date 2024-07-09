import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const registerSchema = z
	.object({
		name: z.string().min(1, 'campo obrigatorio'),
		email: z.string().min(1, 'campo obrigatorio').email('email inválido'),
		password: z.string().min(1, 'campo obrigatorio'),
		retypePassword: z.string().min(1, 'campo obrigatorio'),
	})
	.refine((data) => data.password === data.retypePassword, {
		message: 'As senhas não coincidem',
		path: ['retypePassword'],
	})

type RegisterSchema = z.infer<typeof registerSchema>

interface passwordVisibility {
	password1: boolean
	password2: boolean
}

export const Register = () => {
	const [passwordVisibility, setPasswordVisibility] =
		useState<passwordVisibility>({
			password1: false,
			password2: false,
		})

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<RegisterSchema>({
		resolver: zodResolver(registerSchema),
	})

	const navigate = useNavigate()

	const onSubmit = async (data: RegisterSchema) => {
		try {
			toast.success('Cadastrado com sucesso!', {
				action: {
					label: 'Login',
					onClick: () => navigate(`/auth?email=${data.email}`),
				},
			})
		} catch (error) {
			toast.error('Erro ao cadastrar ')
		}
	}

	return (
		<>
			<Helmet title="Cadastro" />

			<Button variant="ghost" asChild className="absolute right-8 top-8">
				<Link to="/auth">Fazer login</Link>
			</Button>

			<Card className="mx-auto max-w-sm">
				<CardHeader className="flex flex-col gap-2 text-center">
					<h1 className="text-2xl font-semibold tracking-tight">Criar conta</h1>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="name">Nome </Label>
							<Input id="name" type="text" {...register('name')} />
							{errors.name && (
								<span className="text-red-500">{errors.name.message}</span>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="email">Seu e-mail</Label>
							<Input id="email" type="email" {...register('email')} />
							{errors.email && (
								<span className="text-red-500">{errors.email?.message}</span>
							)}
						</div>

						<div className="relative space-y-2	">
							<Label htmlFor="password">Senha</Label>
							<Input
								id="password"
								type={passwordVisibility.password1 ? 'text' : 'password'}
								{...register('password')}
							/>
							{errors.password && (
								<span className="text-red-500">{errors.password?.message}</span>
							)}
							<div className="absolute right-0 top-6">
								<Button
									onClick={() =>
										setPasswordVisibility((prev) => ({
											...prev,
											password1: !passwordVisibility.password1,
										}))
									}
									type="button"
									size="icon"
									variant="ghost"
									className="hover:bg-transparent"
								>
									{passwordVisibility.password1 ? <EyeOff /> : <Eye />}
									<span className="sr-only">
										{passwordVisibility.password1
											? 'Ocultar senha'
											: 'Mostrar senha'}
									</span>
								</Button>
							</div>
						</div>

						<div className="relative space-y-2">
							<Label htmlFor="retypePassword">Repita sua senha</Label>
							<Input
								id="retypePassword"
								type={passwordVisibility.password2 ? 'text' : 'password'}
								{...register('retypePassword')}
							/>
							<div className="absolute right-0 top-6">
								<Button
									onClick={() =>
										setPasswordVisibility((prev) => ({
											...prev,
											password2: !passwordVisibility.password2,
										}))
									}
									type="button"
									size="icon"
									variant="ghost"
									className="hover:bg-transparent"
								>
									{passwordVisibility.password2 ? <EyeOff /> : <Eye />}
									<span className="sr-only">
										{passwordVisibility.password2
											? 'Ocultar senha'
											: 'Mostrar senha'}
									</span>
								</Button>
							</div>
							{errors.retypePassword && (
								<span className="text-red-500">
									{errors.retypePassword?.message}
								</span>
							)}
						</div>

						<Button className="w-full" disabled={isSubmitting} type="submit">
							Finalizar cadastro
						</Button>

						<p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
							Ao continuar, você concorda com nossos{' '}
							<a href="" className="underline underline-offset-4">
								termos de serviço
							</a>{' '}
							e{' '}
							<a href="" className="underline underline-offset-4">
								políticas de privacidade
							</a>
						</p>
					</form>
				</CardContent>
			</Card>
		</>
	)
}
