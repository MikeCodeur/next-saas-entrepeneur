import {
  BadgeEuro,
  BanknoteIcon,
  Cog,
  Flame,
  HandCoinsIcon,
  HeartPulse,
  Home,
  LandmarkIcon,
  type LucideIcon,
  Timer,
  UserRound,
  Weight,
} from 'lucide-react'

export const DATA_ROWS_PER_PAGE = 10

type SidebarLink = {
  title: string
  href: string
  icon: LucideIcon
}

export const dashboardLinks: SidebarLink[] = [
  {href: '/dashboard', title: 'Dashboard', icon: Home},
  {href: '/account', title: 'Compte', icon: UserRound},
  {href: '/settings', title: 'Options', icon: Cog},
  {href: '/finance', title: 'Finance', icon: BadgeEuro},
  {href: '/health', title: 'Santé', icon: HeartPulse},
]

export const paramPage = 'page' as const
export const paramPageSize = 'pageSize' as const
export const pageParamName = 'page' as const
export const yearParamName = 'financeYear' as const
export const healthYearParamName = 'healthYear' as const
export const healthWeekParamName = 'healthWeek' as const
