'use client'

import {Button} from '@/components/ui/button'
import {DeleteHealth} from '@/types/domain/health-types'
import React from 'react'
//import {deleteHealthAction} from '../health-action'
import {toast} from 'sonner'
import {useRouter} from 'next/navigation'

const DeleteHealthForm = ({
  id,
  onClose,
}: {
  id: DeleteHealth['id']
  onClose: () => void
}) => {
  const router = useRouter()

  // eslint-disable-next-line unicorn/consistent-function-scoping
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // const deleteHealthWithId = deleteHealthAction.bind(undefined, {id})

    // const result = await deleteHealthWithId()
    // if (result.errors) {
    //   const idError = result.errors.id
    //   toast.error(idError)
    // }
    // if (result.success) {
    //   toast.success(result.data)
    // } else {
    //   toast.error(result.message)
    // }
    // router.refresh()
    // onClose()
  }
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <p>Souhaitez vous supprimer cette entrée?</p>
      <div className="flex w-full flex-row justify-end">
        <Button type="submit">Supprimer</Button>
      </div>
    </form>
  )
}

export default DeleteHealthForm
