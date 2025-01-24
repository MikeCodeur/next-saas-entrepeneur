'use server'

import {UpdateUser} from '@/types/domain/user-types'
import {processUnknownError} from '@/lib/utils'
import {CSRAction} from '@/types/actions-types'

// 🐶 Importe le schéma Zod ,le service user et le dal user
// import {updateUserFormSchema} from '@/components/forms/form-validators/user-form-schema'
// import {updateUser} from '@/services/user-service'
// import {getUserDal} from '@/app/dal/user-dal'

export const saveUserAction = async (values: UpdateUser) => {
  // 🐶 Étape 1: Récupérer l'utilisateur authentifié `getUserDal`

  // 🐶 Étape 2: Valider les champs du formulaire
  // 🤖 const validateFields = updateUserFormSchema.safeParse(values)

  // 🐶 Étape 3: Vérifier si la validation a échoué
  // 🤖
  // if (!validateFields.success) {
  //   // 🐶 Retourner les erreurs de validation
  //   return {
  //     success: false,
  //     errors: validateFields.error.flatten().fieldErrors,
  //   } satisfies CSRAction
  // }

  // 🐶 Étape 4: Vérifier si l'email de l'utilisateur authentifié est différent de l'email fourni

  // 🐶 Étape 5: Essayer de mettre à jour l'utilisateur
  try {
    // 🤖 await updateUser(validateFields.data)
    // 🐶 Retourner un succès si la mise à jour est réussie
  } catch (error) {
    return {
      success: false,
      message: processUnknownError(error),
      errors: {},
    } satisfies CSRAction
  }
  // ⛏️ Code à supprimer : juste là pour passer le ts check
  return {
    success: true,
    data: 'not implemented',
  } satisfies CSRAction
}
