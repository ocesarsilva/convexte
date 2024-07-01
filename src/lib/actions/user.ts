"use server"

import { unstable_noStore as noStore, revalidatePath } from "next/cache"
import { db } from "@/server/db"
import { user } from "@/server/db/schema"

import { unknownError } from "../constants"
import { getErrorMessage } from "../handle-error"
import { type UpdateAccountWithoutEmailSchema } from "../validators/account"

export async function updateUser(
  input: UpdateAccountWithoutEmailSchema & { userId: string }
) {
  noStore()
  try {
    const [updatedUser] = await db
      .update(user)
      .set({
        avatar: input.avatar,
        firstName: input.firstName,
        lastName: input.lastName,
      })
      .returning({ id: user.id })

    if (!updatedUser) {
      throw new Error(unknownError)
    }

    revalidatePath(`user-${input.userId}`)

    return {
      data: updatedUser.id,
      error: null,
    }
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    }
  }
}
