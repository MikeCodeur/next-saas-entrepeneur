'use server'
// 🐶 Implémente le `sign-in` resend

import {AuthError} from 'next-auth'
import {baseUserFormSchema} from '@/components/forms/form-validators/user-form-schema'
import {processUnknownError} from '@/lib/utils'
import {redirect} from 'next/navigation'
import {signIn} from '@/services/authentication/auth-service'
import {getUserByEmail} from '@/services/user-service'
import {isRedirectError} from 'next/dist/client/components/redirect-error'

export const signInAction = async (
  prevState: string | undefined,
  formData: FormData
) => {
  const validateField = baseUserFormSchema.safeParse({
    email: formData.get('email'),
  })

  if (!validateField.success) {
    return validateField.error.flatten().fieldErrors?.email?.[0]
  }
  try {
    const emailLowerCase = validateField.data.email.toLowerCase()

    const request = await getUserByEmail(emailLowerCase)

    if (!request) {
      return "Aucun compte n'est associé à cet e-mail." as const
    }
    // 🐶 Appelle le `signIn` avec le `provider` resend
    // 🤖
    // const result = await signIn('resend', {
    //   email: request.email,
    //   redirect: false,
    // })

    // 🐶 result contient le lien de redirection (error ou verifyUrl)
    // Redirige vers `result` avec `redirect`
  } catch (error) {
    // 🐶 Gestion des erreurs NEXT_REDIRECT workaround
    //https://github.com/nextauthjs/next-auth/discussions/9389#discussioncomment-8046451
    // if (isRedirectError(error)) {
    //   throw error
    // }
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'EmailSignInError': {
          return 'Email invalide.' as const
        }
        default: {
          return 'Erreur innatendue.' as const
        }
      }
    }
    return processUnknownError(error)
  }
}
