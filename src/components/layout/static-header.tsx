import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {auth} from '@/services/authentication/auth-service'
import {ModeToggle} from '../theme-toggle'

const StaticHeader = async () => {
  return (
    <header className="flex h-14 items-center px-4 lg:px-6">
      <Link className="flex items-center justify-center gap-x-2" href="/">
        <LogoIcon height={24} width={24} />
        <span className="hidden md:flex">Tracker Entrepreneur</span>
      </Link>
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="/public"
        >
          Publique
        </Link>
        <Link
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="/dashboard"
        >
          Tableau de bord
        </Link>
        <ModeToggle />
      </nav>
    </header>
  )
}

type LogoIconProps = Partial<React.ComponentProps<typeof Image>>
function LogoIcon(props?: LogoIconProps) {
  return <Image src="/images/logo.svg" alt="Logo" {...props} priority={false} />
}

export default StaticHeader
