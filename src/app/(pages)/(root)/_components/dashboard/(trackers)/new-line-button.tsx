"use client"

import {Button} from "@/app/components/ui/button"
import {PlusCircle} from "lucide-react"
import {TrackerName} from "@/types/trackers-types"
import {getFormWithTitle} from "@/utils/form-utils"
import {useModalContext} from "@/app/components/modal"
import {useParams} from "next/navigation"

const NewLineButton = ({
  trackerName,
  uid,
  wording,
}: {
  trackerName: TrackerName
  uid: string
  wording: string
}) => {
  const {onClose, setModal, onOpen} = useModalContext()
  const params = useParams<{id: string}>()
  const {form: FormAdd, title} = getFormWithTitle(onClose, trackerName, {
    operation: "create",
    option: {
      uid: params.id ?? uid,
    },
  })

  return (
    <Button
      variant="outline"
      className="ml-4 w-fit md:ml-0"
      onClick={() => {
        setModal({
          title,
          children: FormAdd,
        })
        onOpen()
      }}
    >
      <PlusCircle className="mr-2 size-6" />
      {wording}
    </Button>
  )
}

export default NewLineButton
