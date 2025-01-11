import NextAuth from 'next-auth'
import {authConfig} from './auth-config'

export const {
  unstable_update: updateSession,
  auth,
  signIn,
  signOut,
  handlers: {GET, POST},
} = NextAuth({
  ...authConfig,
})
