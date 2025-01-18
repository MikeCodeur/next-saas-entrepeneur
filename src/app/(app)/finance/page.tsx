import {getUserIdDal} from '@/app/dal/user-dal'
import {notFound} from 'next/navigation'
import React from 'react'
import FinanceDashboard from './finance-dashboard'

type SearchParams = Promise<{
  financeYear?: string
  page?: string
  pageSize?: string
}>

const Page = async (props: {searchParams?: SearchParams}) => {
  const userId = await getUserIdDal()
  if (!userId) notFound()

  const params = await props.searchParams

  return (
    <FinanceDashboard
      financeYear={params?.financeYear}
      page={params?.page}
      pageSize={params?.pageSize}
      userId={userId}
    />
  )
}

export default Page
