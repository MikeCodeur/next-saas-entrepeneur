'use server'
import {signOut} from '@/services/authentication/auth-service'

export async function logout() {
  await signOut()
}
