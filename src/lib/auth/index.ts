import { env } from "@/env.js"
import { db } from "@/server/db"
import { session, user, type User as DbUser } from "@/server/db/schema"
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle"
import { Lucia, TimeSpan } from "lucia"

// Uncomment the following lines if you are using nodejs 18 or lower. Not required in Node.js 20, CloudFlare Workers, Deno, Bun, and Vercel Edge Functions.
// import { webcrypto } from "node:crypto";
// globalThis.crypto = webcrypto as Crypto;

const adapter = new DrizzlePostgreSQLAdapter(db, session, user)

export const lucia = new Lucia(adapter, {
  getSessionAttributes: (/* attributes */) => {
    return {}
  },
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      email: attributes.email,
      emailVerified: attributes.emailVerified,
      avatar: attributes.avatar,
      createdAt: attributes.createdAt,
      updatedAt: attributes.updatedAt,
    }
  },
  sessionExpiresIn: new TimeSpan(30, "d"),
  sessionCookie: {
    name: "session",

    expires: false, // session cookies have very long lifespan (2 years)
    attributes: {
      secure: env.NODE_ENV === "production",
    },
  },
})

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia
    DatabaseSessionAttributes: DatabaseSessionAttributes
    DatabaseUserAttributes: DatabaseUserAttributes
  }
}

interface DatabaseSessionAttributes {}
interface DatabaseUserAttributes extends Omit<DbUser, "hashedPassword"> {}
