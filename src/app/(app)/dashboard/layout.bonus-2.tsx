import withAuth from '@/components/auth/withAuth'
import {Metadata} from 'next'
import {PropsWithChildren} from 'react'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard regroupant les traqueurs de finance et de santé',
}

const DashboardLayout = async ({children}: PropsWithChildren) => {
  return (
    <div className="flex h-screen flex-col md:flex-row xl:justify-center">
      <div className="w-full p-4 md:w-64"></div>
      <div className="w-full max-w-7xl p-4 pt-8">{children}</div>
    </div>
  )
}

export default withAuth(DashboardLayout)
