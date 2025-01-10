"use server"

import {UpdateUser} from "@/types/domain/user-types"
import {updateUserFormSchema} from "@/app/components/forms/form-validators/user-form-schema"

import {signOutAction} from "@/app/components/auth/auth-actions"
import {processUnknownError} from "@/app/utils"
import {updateUser} from "@/services/user-service"
import {CSRAction} from "@/types/actions-types"

export const editUserAction = async (values: UpdateUser) => {
  const validateFields = updateUserFormSchema.safeParse(values)
  if (!validateFields.success) {
    return {
      success: false,
      errors: validateFields.error.flatten().fieldErrors,
    } satisfies CSRAction
  }

  let isEmailChanged = false
  try {
    const oldUser = await updateUser(validateFields.data)
    if (oldUser.email !== validateFields.data.email) {
      isEmailChanged = true
    }
  } catch (error) {
    return {
      success: false,
      message: processUnknownError(error),
    } satisfies CSRAction
  }
  if (!isEmailChanged) {
    return {
      data: "Compte mis à jour",
      success: true,
    } satisfies CSRAction
  }
  await signOutAction()
}
