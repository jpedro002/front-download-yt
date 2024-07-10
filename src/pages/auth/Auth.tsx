import { zodResolver } from '@hookform/resolvers/zod'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/axios'

const loginSchema = z.object({
	url: z.string().url('url inválida').min(4, 'url inválida '),
})

type LoginSchema = z.infer<typeof loginSchema>

export const Auth = () => {
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
			const response = await api.post('/get_audio', data, {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			console.log(response)

			toast.success('Deu Bom', {
				action: {
					label: 'Reenviar',
					onClick: () => {
						onSubmit(data)
					},
				},
			})
		} catch (error) {
			toast.error('Algo de errado')
		}
	}

	return (
		<>
			<Helmet title="Download YT" />

			<Card className="mx-auto w-[80%] max-w-lg">
				<CardHeader>
					<CardTitle className="text-2xl">Baixar Audio do yt</CardTitle>
					<CardDescription>cole sua url do youtube</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="grid gap-4">
							<div className="grid gap-2">
								<Label htmlFor="url">url</Label>
								<Input
									id="url"
									type="url"
									placeholder="https://youtu.be/example"
									{...register('url')}
								/>
								{errors.url?.message && (
									<span className="text-red-400">{errors.url?.message}</span>
								)}
							</div>

							<Button type="submit" className="w-full" disabled={isSubmitting}>
								enviar
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</>
	)
}
