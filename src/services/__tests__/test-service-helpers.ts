import type {Session} from "next-auth"
import {User} from "@/types/domain/user-types"
import {getUserAuthExtented} from "@/services/authentication/auth-utils"
import {vi} from "vitest"

type SetupUserAuthExtended = {
  user: User | undefined
}
export function setupUserAuthExtented({user}: SetupUserAuthExtended) {
  vi.mocked(getUserAuthExtented).mockImplementation(async () => {
    if (!user) return
    return {
      session: {} as Session,
      user,
      role: user?.role ?? "public",
    }
  })
}
