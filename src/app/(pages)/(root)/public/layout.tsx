import React, {Suspense} from "react"

import Footer from "@/app/components/layout/footer"
import Header from "@/app/components/layout/header"
import HeaderSkeleton from "@root/_components/skeletons/header-skeleton"

const PublicLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col">
      <Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </Suspense>
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  )
}

export default PublicLayout
