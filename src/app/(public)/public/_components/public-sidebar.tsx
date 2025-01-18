'use client'

import Link from 'next/link'
import {buttonVariants} from '@/components/ui/button'
import {cn} from '@/lib/utils'
import {trackersPublicLinks} from '@/utils/constants'
import {usePathname} from 'next/navigation'

const SideBarPublic = () => {
  const pathname = usePathname()
  const publicUserId = pathname.split('/')[2]
  const publicPathTrackers = trackersPublicLinks.map((link) => {
    return {
      ...link,
      href: `/public/${publicUserId}/${link.href}`,
    }
  })
  return (
    <div className="mx-auto flex h-full flex-wrap justify-stretch gap-3 md:mx-0 md:flex-col">
      {publicPathTrackers.map((link) => {
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              buttonVariants({variant: 'ghost'}),
              pathname.includes(link.href) && 'bg-muted',
              'grow justify-center border hover:bg-muted md:grow-0 md:justify-start md:border-0'
            )}
          >
            <link.icon className="size-6 md:hidden" />
            <span className="hidden md:block">{link.title}</span>
          </Link>
        )
      })}
    </div>
  )
}

export default SideBarPublic
