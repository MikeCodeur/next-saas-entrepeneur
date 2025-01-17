'use client'

import {DeleteHealth} from '@/types/domain/health-types'
import {FormSubmitServerButton} from '@/components/forms/form-submit-button'
import React from 'react'
import {deleteHealthAction} from './health-action'
import {useToast} from '@/components/hooks/use-toast'

const DeleteHealthForm = ({
  id,
  onClose,
}: {
  id: DeleteHealth['id']
  onClose: () => void
}) => {
  const {toast} = useToast()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    console.log('onSubmit', event)
    event.preventDefault()

    const result = await deleteHealthAction(id)
    console.log('result', result)
    if (result.success) {
      toast({title: 'Succes', description: result.data})
    } else {
      toast({
        title: result.data,
        description: result.data,
        variant: 'destructive',
      })
    }
    onClose()
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <p>Souhaitez vous supprimer cette entrée?</p>
      <div className="flex w-full flex-row justify-end">
        <FormSubmitServerButton>Supprimer</FormSubmitServerButton>
      </div>
    </form>
  )
}

export default DeleteHealthForm
