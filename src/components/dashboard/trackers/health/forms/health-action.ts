'use server'

import {
  createEditHealthFormSchema,
  updateHealthFormSchema,
} from '@/components/forms/form-validators/health-form-schema'
import {processUnknownError} from '@/lib/utils'
import {
  createHealthByUid,
  deleteHealthByid,
  updateHealth,
} from '@/services/health-service'

import {CSRAction} from '@/types/actions-types'
import {CreateEditHealth, DeleteHealth} from '@/types/domain/health-types'
import {formattedDate} from '@/utils/date-utils'
import {revalidatePath} from 'next/cache'

export const createHealthAction = async (
  values: CreateEditHealth,
  uid: string
) => {
  const validateFields = createEditHealthFormSchema.safeParse(values)
  if (!validateFields.success)
    return {
      success: false,
      errors: validateFields.error.flatten().fieldErrors,
    } satisfies CSRAction
  try {
    await createHealthByUid(validateFields.data, uid)
    revalidatePath('/health')
  } catch (error) {
    return {
      success: false,
      message: processUnknownError(error),
    } satisfies CSRAction
  }
  return {
    success: true,
    data: `Nouveau champ ${validateFields.data.category} crée`,
  } satisfies CSRAction
}
export const editHealthAction = async (values: CreateEditHealth) => {
  const validateFields = updateHealthFormSchema.safeParse(values)
  if (!validateFields.success)
    return {
      success: false,
      errors: validateFields.error.flatten().fieldErrors,
    } satisfies CSRAction
  try {
    await updateHealth(validateFields.data)
    revalidatePath('/health')
  } catch (error) {
    return {
      success: false,
      message: processUnknownError(error),
    } satisfies CSRAction
  }
  return {
    success: true,
    data: `L(')(e) ${validateFields.data.category} du ${formattedDate(validateFields.data.date)} à était mis à jour`,
  } satisfies CSRAction
}
export const deleteHealthAction = async (id: string) => {
  try {
    await deleteHealthByid(id)
    revalidatePath('/health')
  } catch (error) {
    return {
      success: false,
      message: processUnknownError(error),
    } satisfies CSRAction
  }
  return {
    success: true,
    data: `suppression effectuée`,
  } satisfies CSRAction
}
