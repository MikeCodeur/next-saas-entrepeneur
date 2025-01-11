import type {NextAuthConfig} from 'next-auth'

export const authConfig = {
  trustHost: true,
  callbacks: {},
  providers: [],
  secret: process.env.AUTH_SECRET,
  session: {},
} satisfies NextAuthConfig
