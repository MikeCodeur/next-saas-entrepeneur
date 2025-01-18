import FinanceDashboard from '@/app/(app)/finance/finance-dashboard'
import {getUserIdDal} from '@/app/dal/user-dal'
import {canReadFinance} from '@/services/authorization/finance-authorization'
import {getYearsFinancesByUid} from '@/services/finance-service'
import {notFound, redirect} from 'next/navigation'

type SearchParams = Promise<{
  financeYear?: string
  page?: string
  pageSize?: string
}>

type Params = Promise<{
  id?: string
}>

const Page = async (props: {params: Params; searchParams?: SearchParams}) => {
  const searchParams = await props.searchParams
  const params = await props.params
  const userId = params?.id
  console.log('userId 2', userId)
  if (!userId) notFound()

  const canRead = await canReadFinance(userId)

  if (!canRead) {
    redirect('/restricted')
  }
  console.log('userId', userId)
  console.log('searchParams', searchParams)
  const years = await getYearsFinancesByUid(userId)
  console.log('years', years)
  if (!years) {
    return (
      <div className="flex  flex-col items-center justify-center">
        <h1 className="mb-4 text-2xl font-semibold">Pas de résultat</h1>
      </div>
    )
  }
  return (
    <FinanceDashboard
      financeYear={searchParams?.financeYear}
      page={searchParams?.page}
      pageSize={searchParams?.pageSize}
      userId={userId}
    />
  )
}

export default Page
