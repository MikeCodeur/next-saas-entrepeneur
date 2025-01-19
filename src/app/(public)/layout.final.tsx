import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import StaticHeader from '@/components/layout/static-header'
import {Metadata} from 'next'
import {PropsWithChildren} from 'react'

export const metadata: Metadata = {
  title: 'Next SaaS',
  description:
    "Page de conditions d'utilisation et de politique de confidentialité",
}
const PublicLayout = ({children}: PropsWithChildren) => {
  return (
    <div>
      <StaticHeader />
      {children}
      <Footer />
    </div>
  )
}

export default PublicLayout
