// import {ModalProvider} from "@/app/components/modal"
import React from "react"

const TrackerLayout = ({children}: {children: React.ReactNode}) => {
  // return <ModalProvider>{children}</ModalProvider>
  return <>{children}</>
}

export default TrackerLayout
