import CreateEditFinanceForm from "@root/_components/dashboard/(trackers)/finance/forms/create-edit-finance-form"
import CreateEditHealthForm from "@root/_components/dashboard/(trackers)/health/forms/create-edit-health-form"
import DeleteFinanceForm from "@root/_components/dashboard/(trackers)/finance/forms/delete-finance-form"
import DeleteHealthForm from "@root/_components/dashboard/(trackers)/health/forms/delete-health-form"
import {Finance} from "@/types/domain/finance-types"
import {Health} from "@/types/domain/health-types"
import {TrackerName} from "@/types/trackers-types"

type DialogProps = {
  onClose: () => void
  trackerName: TrackerName
}
type FormAddProps = {
  option: {
    uid: string
  }
}

type FormUpdateProps<T> = {
  option: {
    data: T
    uid: string
  }
}

type FormDeleteProps = {
  option: {
    id: string
  }
}

type FormDataCRUD<T> =
  | (FormAddProps & {
      operation: "create"
    })
  | (FormUpdateProps<T> & {
      operation: "update"
    })
  | (FormDeleteProps & {
      operation: "delete"
    })

export function getFormWithTitle<T>(
  onClose: () => void,
  trackerName: TrackerName,
  formDataCrud: FormDataCRUD<T>
) {
  const modal = getForm(formDataCrud, {
    trackerName,
    onClose,
  })

  return {
    ...modal,
  }
}
function getForm<T>(formDataCrud: FormDataCRUD<T>, dialog: DialogProps) {
  const {onClose, trackerName} = dialog
  let result
  const name = getNameFromTrackerName(trackerName)
  switch (formDataCrud.operation) {
    case "create": {
      result = {
        title: `Ajouter ${name}`,
        form: (
          <FormAdd
            trackerName={trackerName}
            onClose={onClose}
            option={formDataCrud.option}
          />
        ),
      }
      break
    }
    case "update": {
      result = {
        title: `Modifier ${name}`,
        form: (
          <FormEdit
            trackerName={trackerName}
            option={formDataCrud.option}
            onClose={onClose}
          />
        ),
      }
      break
    }
    case "delete": {
      result = {
        title: `Supprimer ${name}`,
        form: (
          <FormDelete
            trackerName={trackerName}
            option={formDataCrud.option}
            onClose={onClose}
          />
        ),
      }
      break
    }
  }
  return result
}

const FormAdd = (props: FormAddProps & DialogProps) => {
  const {onClose, trackerName, option} = props
  let result
  switch (trackerName) {
    case "finance": {
      result = <CreateEditFinanceForm onClose={onClose} uid={option.uid} />
      break
    }
    case "health": {
      result = <CreateEditHealthForm onClose={onClose} uid={option.uid} />
      break
    }
  }
  return result
}
function FormEdit<T>(props: FormUpdateProps<T> & DialogProps) {
  const {onClose, trackerName, option} = props
  let result
  switch (trackerName) {
    case "finance": {
      const data = option.data as Finance
      result = (
        <CreateEditFinanceForm
          onClose={onClose}
          uid={option.uid}
          finance={data}
        />
      )
      break
    }
    case "health": {
      const data = option.data as Health
      result = (
        <CreateEditHealthForm
          health={data}
          onClose={onClose}
          uid={option.uid}
        />
      )
      break
    }
  }

  return result
}
const FormDelete = (props: FormDeleteProps & DialogProps) => {
  const {onClose, trackerName, option} = props
  let result

  switch (trackerName) {
    case "finance": {
      result = <DeleteFinanceForm id={option.id} onClose={onClose} />
      break
    }
    case "health": {
      result = <DeleteHealthForm id={option.id} onClose={onClose} />
      break
    }
  }

  return result
}

const getNameFromTrackerName = (trackerName: TrackerName) => {
  switch (trackerName) {
    case "finance": {
      return "Finance"
    }
    case "health": {
      return "Santé"
    }
  }
}
