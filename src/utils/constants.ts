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
]
