import {GRANTED_ERROR_MESSAGE} from "@/services/errors/granted-error"
import {CircleX, ShieldAlert, VariableIcon} from "lucide-react"

export const IconForErrorType = ({error}: {error: Error}) => {
  switch (error.message) {
    case GRANTED_ERROR_MESSAGE: {
      return <ShieldAlert className="mx-auto h-12 w-12" />
    }
    case "ParsedError": {
      return <VariableIcon className="mx-auto h-12 w-12" />
    }
    default: {
      return <CircleX className="mx-auto h-12 w-12" />
    }
  }
}
