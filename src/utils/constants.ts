import {FinanceCategory} from "@/types/domain/finance-types"
import {HealthCategory} from "@/types/domain/health-types"
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
} from "lucide-react"

export const trackers = ["finance", "health"] as const

type BaseTableWithIcon = {
  label: string
  icon: LucideIcon
}

type FinanceCategoryWithIcon = BaseTableWithIcon & {
  value: FinanceCategory
}

type HealthCategoryWithIcon = BaseTableWithIcon & {
  value: HealthCategory
}

export const financeCategories = [
  "revenus",
  "dépenses",
  "actifs",
] as const satisfies FinanceCategory[]

export const healthCategories = [
  "calories",
  "poids",
  "temps",
] as const satisfies HealthCategory[]

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
export const getFinanceCategories = () => {
  return financeCategories
}

export const getHealthCategories = () => {
  return healthCategories
}
export const financeTableCategories = [
  {
    value: FINANCE_CATEGORIES.incomes,
    label: "Revenus",
    icon: HandCoinsIcon,
  },
  {
    value: FINANCE_CATEGORIES.outcomes,
    label: "Dépenses",
    icon: BanknoteIcon,
  },
  {
    value: FINANCE_CATEGORIES.assets,
    label: "Actifs",
    icon: LandmarkIcon,
  },
] as const satisfies FinanceCategoryWithIcon[]

export const healthHealthTableCategories = [
  {
    value: HEALTH_CATEGORIES.calories,
    label: "Calories",
    icon: Flame,
  },
  {
    value: HEALTH_CATEGORIES.poids,
    label: "Poids",
    icon: Weight,
  },
  {
    value: HEALTH_CATEGORIES.temps,
    label: "Temps",
    icon: Timer,
  },
] as const satisfies HealthCategoryWithIcon[]

export const DATA_TABLE_CATEGORIES = {
  finance: financeTableCategories,
  health: healthHealthTableCategories,
}

export const DATA_ROWS_PER_PAGE = 10

type SidebarLink = {
  title: string
  href: string
  icon: LucideIcon
}
const trackersPatternLinks = (prefix?: string) => {
  const prefixPath = prefix ? `/${prefix}` : ""
  return [
    {
      href: `${prefixPath}/health`,
      title: `Santé`,
      icon: HeartPulse,
    },
    {
      href: `${prefixPath}/finance`,
      title: `Finance`,
      icon: BadgeEuro,
    },
  ] satisfies SidebarLink[]
}
export const trackersPublicLinks: SidebarLink[] = trackersPatternLinks()

export const trackersDashboardLinks: SidebarLink[] =
  trackersPatternLinks("dashboard")
export const dashboardLinks: SidebarLink[] = [
  {href: "/dashboard", title: "Dashboard", icon: Home},
  {href: "/dashboard/account", title: "Compte", icon: UserRound},
  {href: "/dashboard/settings", title: "Options", icon: Cog},
  ...trackersDashboardLinks,
]
