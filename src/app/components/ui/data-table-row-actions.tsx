"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"

import {Button} from "@/app/components/ui/button"
import {Finance} from "@/types/domain/finance-types"
import {Health} from "@/types/domain/health-types"
import {MoreHorizontal} from "lucide-react"
import {getFormWithTitle} from "@/utils/form-utils"
import {useModalContext} from "@/app/components/modal"
import {TrackerName} from "@/types/trackers-types"

type DataTableRowActionsProps = {
  data: Finance | Health
  uid: string
}
export const DataTableRowActions = (props: DataTableRowActionsProps) => {
  const trackerName =
    "amount" in props.data ? "finance" : ("health" satisfies TrackerName)
  const {setModal, onOpen, onClose} = useModalContext()

  const {form: FormUpdate, title: titleUpdate} = getFormWithTitle(
    onClose,
    trackerName,
    {
      operation: "update",
      option: {data: props.data, uid: props.uid},
    }
  )
  const {form: FormDelete, title: titleDelete} = getFormWithTitle(
    onClose,
    trackerName,
    {
      operation: "delete",
      option: {id: props.data.id},
    }
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="p-2">
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Ouvrir menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            setModal({
              title: titleUpdate,
              children: FormUpdate,
            })
            onOpen()
          }}
        >
          Editer
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setModal({
              title: titleDelete,
              children: FormDelete,
            })
            onOpen()
          }}
        >
          Supprimer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
