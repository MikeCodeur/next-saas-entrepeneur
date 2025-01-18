'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

import {usePathname} from 'next/navigation'
import {User} from '@/types/domain/user-types'
import {trackers} from '@/utils/constants'

const PublicBreadcrumb = ({user}: {user?: User}) => {
  const pathname = usePathname()
  const listItem = pathname.split('/').filter((item) => item !== '')
  const pathPossible = [...trackers] as string[]
  //check if pathname is part of existing trackers
  const hasPath = listItem.some((item) => pathPossible.includes(item))
  const listItemWithLink = listItem.map((item) => {
    return {
      name: item,
      link: `${pathname.split(item)[0]}${item}`,
    }
  })

  return (
    <Breadcrumb className="p-4 pl-6">
      <BreadcrumbList>
        {listItemWithLink.map((item, index) => {
          // index 1 to display username else display link
          const isDisplayUserName = index === 1 && hasPath
          const isDisplaySeparator = index !== listItem.length - 1
          return (
            <div
              className="flex flex-row items-center justify-center gap-3"
              key={index}
            >
              <BreadcrumbItem>
                {isDisplayUserName ? (
                  <span>{user?.name}</span>
                ) : (
                  <BreadcrumbLink href={item.link}>{item.name}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {isDisplaySeparator && <BreadcrumbSeparator />}
            </div>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default PublicBreadcrumb
