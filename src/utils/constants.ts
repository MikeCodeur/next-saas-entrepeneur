import {FinanceCategory} from '@/types/domain/finance-types'
import {HealthCategory} from '@/types/domain/health-types'
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

export const trackersPublicLinks: SidebarLink[] = [
  {href: '/finance', title: 'Finance', icon: BadgeEuro},
  {href: '/health', title: 'Santé', icon: HeartPulse},
]

export const paramPage = 'page' as const
export const paramPageSize = 'pageSize' as const
export const pageParamName = 'page' as const
export const yearParamName = 'financeYear' as const
export const healthYearParamName = 'healthYear' as const
export const healthWeekParamName = 'healthWeek' as const

export const financeCategories = [
  'revenus',
  'dépenses',
  'actifs',
] as const satisfies FinanceCategory[]

export const healthCategories = [
  'calories',
  'poids',
  'temps',
] as const satisfies HealthCategory[]

export const trackers = ['finance', 'health'] as const

export type TrackerType = 'finance' | 'health'

export const FINANCE_CATEGORIES = {
  incomes: financeCategories[0],
  outcomes: financeCategories[1],
  assets: financeCategories[2],
} as const

export const HEALTH_CATEGORIES = {
  calories: healthCategories[0],
  poids: healthCategories[1],
  temps: healthCategories[2],
} as const
