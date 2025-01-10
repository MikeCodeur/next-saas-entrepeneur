"use client"

import {DeleteFinance} from "@/types/domain/finance-types"
import {FormSubmitServerButton} from "@/app/components/forms/form-submit-button"
import React from "react"
import {deleteFinanceAction} from "../finance-action"
import {toast} from "sonner"
import {useRouter} from "next/navigation"
const DeleteFinanceForm = ({
  id,
  onClose,
}: {
  id: DeleteFinance["id"]
  onClose: () => void
}) => {
  const router = useRouter()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const deleteFinanceWithId = deleteFinanceAction.bind(undefined, {
      id,
    })
    const result = await deleteFinanceWithId()
    if (result.success) {
      toast.success(result.data)
    } else {
      toast.error(result.message)
    }
    router.refresh()
    onClose()
  }
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <p>Souhaitez vous supprimer cette entrée?</p>
      <div className="flex w-full flex-row justify-end">
        <FormSubmitServerButton>Supprimer</FormSubmitServerButton>
      </div>
    </form>
  )
}

export default DeleteFinanceForm
