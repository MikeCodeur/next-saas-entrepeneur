'use server'

import type {CSRAction} from '@/types/actions-types'
import type {CreateEditFinance} from '@/types/domain/finance-types'

import {processUnknownError} from '@/lib/utils'
import {
  createFinanceByUid,
  deleteFinanceByid,
  updateFinance,
} from '@/services/finance-service'
import {formattedDate} from '@/utils/date-utils'
import {
  createEditFinanceFormSchema,
  updateFinanceFormShema,
} from '@/components/forms/form-validators/finance-form-schema'
import {revalidatePath} from 'next/cache'

export const createFinanceAction = async (values: CreateEditFinance) => {
  console.log('createFinanceAction', values)
  const validateFields = createEditFinanceFormSchema.safeParse(values)
  if (!validateFields.success)
    return {
      success: false,
      errors: validateFields.error.flatten().fieldErrors,
    } satisfies CSRAction

  try {
    await createFinanceByUid(validateFields.data, validateFields.data.userId)
    revalidatePath('/finance')
  } catch (error) {
    return {
      success: false,
      message: processUnknownError(error),
    } satisfies CSRAction
  }
  return {
    success: true,
    data: `nouvelle ${validateFields.data.category} crée`,
  } satisfies CSRAction
}
export const editFinanceAction = async (values: CreateEditFinance) => {
  const validateFields = updateFinanceFormShema.safeParse(values)
  if (!validateFields.success)
    return {
      success: false,
      errors: validateFields.error.flatten().fieldErrors,
    } satisfies CSRAction

  try {
    await updateFinance(validateFields.data)
    revalidatePath('/finance')
  } catch (error) {
    return {
      success: false,
      message: processUnknownError(error),
    } satisfies CSRAction
  }
  const {date, category} = validateFields.data
  return {
    success: true,
    data: `${category} du ${formattedDate(date)} mis à jour`,
  } satisfies CSRAction
}
export const deleteFinanceAction = async (id: string) => {
  try {
    await deleteFinanceByid(id)
    revalidatePath('/finance')
  } catch (error) {
    return {
      message: processUnknownError(error),
      success: false,
    } satisfies CSRAction
  }
  return {
    success: true,
    data: 'suppression effectuée',
  } satisfies CSRAction
}
