import { z } from "zod"

export const signupSchema = z.object({
  email: z.string().email("Por favor digite um email válido."),
  password: z.string().min(1, "Por favor, forneça sua senha.").max(255),
})

export const loginSchema = z.object({
  email: z.string().email("Por favor digite um email válido."),
  password: z
    .string()
    .min(8, "A senha é muito curta. Mínimo 8 caracteres necessários.")
    .max(255),
})

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
})

export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Token inválido"),
  password: z.string().min(8, "A senha é muito curta").max(255),
})

export type LoginInput = z.infer<typeof loginSchema>
export type SignupInput = z.infer<typeof signupSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
