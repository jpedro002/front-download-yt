import { z } from 'zod'

const envSchema = z.object({
	VITE_API_URL: z.string().url(),
})

const parsedEnvs = envSchema.safeParse(import.meta.env)

if (!parsedEnvs.success) {
	console.error(parsedEnvs.error)
	throw new Error('Invalid environment variables')
}

export const env = envSchema.parse(import.meta.env)
