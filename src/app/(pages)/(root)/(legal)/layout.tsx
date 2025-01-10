import Footer from "@/app/components/layout/footer"
import Header from "@/app/components/layout/header"
import {Metadata} from "next"
import {PropsWithChildren} from "react"

export const metadata: Metadata = {
  title: "Legal",
  description:
    "Page de conditions d'utilisation et de politique de confidentialité",
}
const LegalLayout = ({children}: PropsWithChildren) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default LegalLayout
