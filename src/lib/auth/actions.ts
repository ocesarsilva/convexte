"use server"

/* eslint @typescript-eslint/no-explicit-any:0, @typescript-eslint/prefer-optional-chain:0 */
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { env } from "@/env"
import { db } from "@/server/db"
import {
  emailVerificationCode,
  passwordResetToken,
  user,
} from "@/server/db/schema"
import { eq } from "drizzle-orm"
import { generateId, Scrypt } from "lucia"
import { createDate, isWithinExpirationDate, TimeSpan } from "oslo"
import { alphabet, generateRandomString } from "oslo/crypto"
import { z } from "zod"

import { lucia } from "@/lib/auth"
import { validateRequest } from "@/lib/auth/validate-request"
import { EmailTemplate, sendMail } from "@/lib/email"
import {
  loginSchema,
  resetPasswordSchema,
  signupSchema,
  type LoginInput,
  type SignupInput,
} from "@/lib/validators/auth"

import { Paths } from "../constants"

export interface ActionResponse<T> {
  fieldError?: Partial<Record<keyof T, string | undefined>>
  formError?: string
}

export async function login(
  _: any,
  formData: FormData
): Promise<ActionResponse<LoginInput>> {
  const obj = Object.fromEntries(formData.entries())

  const parsed = loginSchema.safeParse(obj)
  if (!parsed.success) {
    const err = parsed.error.flatten()
    return {
      fieldError: {
        email: err.fieldErrors.email?.[0],
        password: err.fieldErrors.password?.[0],
      },
    }
  }

  const { email, password } = parsed.data

  const existingUser = await db.query.user.findFirst({
    where: (table, { eq }) => eq(table.email, email),
  })

  if (!existingUser) {
    return {
      formError: "Senha ou email incorretos",
    }
  }

  if (!existingUser || !existingUser?.hashedPassword) {
    return {
      formError: "Senha ou email incorretos",
    }
  }

  const validPassword = await new Scrypt().verify(
    existingUser.hashedPassword,
    password
  )
  if (!validPassword) {
    return {
      formError: "Senha ou email incorretos",
    }
  }

  const session = await lucia.createSession(existingUser.id, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )
  return redirect(Paths.Dashboard)
}

export async function signup(
  _: any,
  formData: FormData
): Promise<ActionResponse<SignupInput>> {
  const obj = Object.fromEntries(formData.entries())

  const parsed = signupSchema.safeParse(obj)
  if (!parsed.success) {
    const err = parsed.error.flatten()
    return {
      fieldError: {
        email: err.fieldErrors.email?.[0],
        password: err.fieldErrors.password?.[0],
      },
    }
  }

  const { email, password } = parsed.data

  const existingUser = await db.query.user.findFirst({
    where: (table, { eq }) => eq(table.email, email),
    columns: { email: true },
  })

  if (existingUser) {
    return {
      formError: "Não é possível criar conta com esse e-mail",
    }
  }

  const userId = generateId(21)
  const hashedPassword = await new Scrypt().hash(password)
  await db.insert(user).values({
    id: userId,
    email,
    hashedPassword,
  })

  const verificationCode = await generateEmailVerificationCode(userId, email)
  await sendMail(email, EmailTemplate.EmailVerification, {
    code: verificationCode,
  })

  const session = await lucia.createSession(userId, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )
  return redirect(Paths.VerifyEmail)
}

export async function logout(): Promise<{ error: string } | void> {
  const { session } = await validateRequest()
  if (!session) {
    return {
      error: "Nenhuma sessão encontrada",
    }
  }
  await lucia.invalidateSession(session.id)
  const sessionCookie = lucia.createBlankSessionCookie()
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )
  return redirect("/")
}

export async function resendVerificationEmail(): Promise<{
  error?: string
  success?: boolean
}> {
  const { user } = await validateRequest()
  if (!user) {
    return redirect(Paths.Login)
  }
  const lastSent = await db.query.emailVerificationCode.findFirst({
    where: (table, { eq }) => eq(table.userId, user.id),
    columns: { expiresAt: true },
  })

  if (lastSent && isWithinExpirationDate(lastSent.expiresAt)) {
    return {
      error: `Por favor, aguarde ${timeFromNow(lastSent.expiresAt)} antes de reenviar`,
    }
  }
  const verificationCode = await generateEmailVerificationCode(
    user.id,
    user.email
  )
  await sendMail(user.email, EmailTemplate.EmailVerification, {
    code: verificationCode,
  })

  return { success: true }
}

export async function verifyEmail(
  _: any,
  formData: FormData
): Promise<{ error: string } | void> {
  const code = formData.get("code")
  if (typeof code !== "string" || code.length !== 8) {
    return { error: "Código inválido" }
  }
  const { user: currentUser } = await validateRequest()
  if (!currentUser) {
    return redirect(Paths.Login)
  }

  const dbCode = await db.transaction(async (tx) => {
    const item = await tx.query.emailVerificationCode.findFirst({
      where: (table, { eq }) => eq(table.userId, currentUser.id),
    })
    if (item) {
      await tx
        .delete(emailVerificationCode)
        .where(eq(emailVerificationCode.id, item.id))
    }
    return item
  })

  if (!dbCode || dbCode.code !== code)
    return { error: "Código de verificação inválido" }

  if (!isWithinExpirationDate(dbCode.expiresAt))
    return { error: "O código de verificação expirou" }

  if (dbCode.email !== currentUser.email)
    return { error: "E-mail não corresponde" }

  await lucia.invalidateUserSessions(currentUser.id)
  await db.update(user).set({ emailVerified: true }).where(eq(user.id, user.id))
  const session = await lucia.createSession(currentUser.id, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )
  redirect(Paths.Dashboard)
}

export async function sendPasswordResetLink(
  _: any,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const email = formData.get("email")
  const parsed = z.string().trim().email().safeParse(email)
  if (!parsed.success) {
    return { error: "O e-mail fornecido é inválido." }
  }
  try {
    const currentUser = await db.query.user.findFirst({
      where: (table, { eq }) => eq(table.email, parsed.data),
    })

    if (!currentUser || !currentUser.emailVerified)
      return { error: "O e-mail fornecido é inválido." }

    const verificationToken = await generatePasswordResetToken(currentUser.id)

    const verificationLink = `${env.NEXT_PUBLIC_APP_URL}/reset-password/${verificationToken}`

    await sendMail(currentUser.email, EmailTemplate.PasswordReset, {
      link: verificationLink,
    })

    return { success: true }
  } catch (error) {
    return { error: "Falha ao enviar e-mail de verificação." }
  }
}

export async function resetPassword(
  _: any,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const obj = Object.fromEntries(formData.entries())

  const parsed = resetPasswordSchema.safeParse(obj)

  if (!parsed.success) {
    const err = parsed.error.flatten()
    return {
      error: err.fieldErrors.password?.[0] ?? err.fieldErrors.token?.[0],
    }
  }
  const { token, password } = parsed.data

  const dbToken = await db.transaction(async (tx) => {
    const item = await tx.query.passwordResetToken.findFirst({
      where: (table, { eq }) => eq(table.id, token),
    })
    if (item) {
      await tx
        .delete(passwordResetToken)
        .where(eq(passwordResetToken.id, item.id))
    }
    return item
  })

  if (!dbToken) return { error: "Link de redefinição de senha inválido" }

  if (!isWithinExpirationDate(dbToken.expiresAt))
    return { error: "O link de redefinição de senha expirou." }

  await lucia.invalidateUserSessions(dbToken.userId)
  const hashedPassword = await new Scrypt().hash(password)
  await db
    .update(user)
    .set({ hashedPassword })
    .where(eq(user.id, dbToken.userId))
  const session = await lucia.createSession(dbToken.userId, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )
  redirect(Paths.Dashboard)
}

const timeFromNow = (time: Date) => {
  const now = new Date()
  const diff = time.getTime() - now.getTime()
  const minutes = Math.floor(diff / 1000 / 60)
  const seconds = Math.floor(diff / 1000) % 60
  return `${minutes}m ${seconds}s`
}

async function generateEmailVerificationCode(
  userId: string,
  email: string
): Promise<string> {
  await db
    .delete(emailVerificationCode)
    .where(eq(emailVerificationCode.userId, userId))
  const code = generateRandomString(8, alphabet("0-9")) // 8 digit code
  await db.insert(emailVerificationCode).values({
    userId,
    email,
    code,
    expiresAt: createDate(new TimeSpan(10, "m")), // 10 minutes
  })
  return code
}

async function generatePasswordResetToken(userId: string): Promise<string> {
  await db
    .delete(passwordResetToken)
    .where(eq(passwordResetToken.userId, userId))
  const tokenId = generateId(40)
  await db.insert(passwordResetToken).values({
    id: tokenId,
    userId,
    expiresAt: createDate(new TimeSpan(2, "h")),
  })
  return tokenId
}
