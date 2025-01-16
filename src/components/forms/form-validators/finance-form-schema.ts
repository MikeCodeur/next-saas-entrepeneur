import {CreateEditFinance, FinanceCategory} from '@/types/domain/finance-types'
import {z} from 'zod'

export {updateFinanceServiceShema as updateFinanceFormShema} from '@/services/validations/finance-validation'

export const createEditFinanceFormSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  date: z.coerce.date(),
  amount: z.coerce.number(),
  category: z.enum([
    'revenus',
    'dépenses',
    'actifs',
  ]) satisfies z.Schema<FinanceCategory>,
  label: z
    .string()
    .min(2, {
      message: 'Le nom doit contenir au moins 3 caractères.',
    })
    .max(30, {
      message: 'Le nom ne doit pas contenir plus de 30 caractères.',
    }),
}) satisfies z.Schema<CreateEditFinance>
