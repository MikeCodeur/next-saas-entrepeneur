'use server'

import {UpdateUser} from '@/types/domain/user-types'
import {updateUserFormSchema} from '@/components/forms/form-validators/user-form-schema'
import {processUnknownError} from '@/lib/utils'
import {updateUser} from '@/services/user-service'
import {CSRAction} from '@/types/actions-types'
import {getUserDal} from '@/app/dal/user-dal'
import {revalidatePath} from 'next/cache'

export const saveUserAction = async (values: UpdateUser) => {
  const authUser = await getUserDal()
  const validateFields = updateUserFormSchema.safeParse(values)
  if (!validateFields.success) {
    return {
      success: false,
      errors: validateFields.error.flatten().fieldErrors,
    } satisfies CSRAction
  }
  if (authUser?.email !== values.email) {
    return {
      success: false,
      errors: {
        email: [`Vous ne pouvez pas modifier l'email de votre compte`],
      },
    } satisfies CSRAction
  }
  try {
    await updateUser(validateFields.data)
    revalidatePath('/account')
    return {
      data: 'Compte mis à jour',
      success: true,
    } satisfies CSRAction
  } catch (error) {
    return {
      success: false,
      message: processUnknownError(error),
    } satisfies CSRAction
  }
}
