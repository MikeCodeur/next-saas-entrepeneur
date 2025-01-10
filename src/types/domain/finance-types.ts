import {CreateEditFinanceModel, FinanceModel} from "@/data/models/finance-model"

export type Finance = FinanceModel
//Mike : Simplifier au MAX les types CRUD generiques
export type CreateFinance = CreateEditFinanceModel //Mike : create finance without userId is not allowed
export type UpdateFinance = Finance // Partial<Finance>
export type DeleteFinance = Pick<Finance, "id">

//ensuite les specifique
export type FinanceCategory = FinanceModel["category"]
export type CreateEditFinance = Omit<CreateEditFinanceModel, "userId"> & {
  userId?: string
} //Mike : create edit finance without userId is not allowed

//Mike : DTO define the DTO Type with less fiels
export type FinanceDTO = Finance // now is same
