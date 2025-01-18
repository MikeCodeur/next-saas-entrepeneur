'use client'

import {DeleteFinance} from '@/types/domain/finance-types'
import {FormSubmitServerButton} from '@/components/forms/form-submit-button'
import React from 'react'

import {useRouter} from 'next/navigation'
import {deleteFinanceAction} from './finance-action'
import {toast, useToast} from '@/components/hooks/use-toast'
const DeleteFinanceForm = ({
  id,
  onClose,
}: {
  id: DeleteFinance['id']
  onClose: () => void
}) => {
  const {toast} = useToast()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const result = await deleteFinanceAction(id)
    console.log('result', result)
    if (result.success) {
      toast({title: 'Succes', description: result.data})
    } else {
      toast({
        title: 'Erreur',
        description: result.message,
        variant: 'destructive',
      })
    }
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
