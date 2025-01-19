import {
  createUserDao,
  getPublicUsersWithPaginationDao,
  getUserByEmailDao,
  getUserByIdDao,
  updateUserByUidDao,
} from '@/data/repositories/user-repository'
import {
  canReadUser,
  canUpdateUser,
} from '@/services/authorization/user-authorization'

import type {CreateUser, UpdateUser} from '@/types/domain/user-types'
import {DATA_ROWS_PER_PAGE} from '@/utils/constants'
import {getSessionAuth} from './authentication/auth-utils'
import {
  baseUserServiceSchema,
  createUserServiceSchema,
  updateUserServiceSchema,
  userUuidSchema,
} from './validations/user-validation'
import {GrantedError} from './errors/granted-error'
import {ParsedError} from './errors/parsed-error'

export const createUser = async (userParams: CreateUser) => {
  const parsed = createUserServiceSchema.safeParse(userParams)
  if (!parsed.success) {
    throw new ParsedError(parsed.error.message)
  }
  const userParamsSanitized = parsed.data
  const user = await createUserDao(userParamsSanitized)
  return user
}
export const updateUser = async (userParams: UpdateUser) => {
  const resourceUid = userParams.id
  const granted = await canUpdateUser(resourceUid)

  if (!granted) {
    throw new GrantedError()
  }

  const userBeforeUpdate = await getUserByIdDao(userParams.id)

  if (!userBeforeUpdate) {
    throw new Error('Utilisateur introuvable')
  }

  const parsed = updateUserServiceSchema.safeParse(userParams)
  if (!parsed.success) {
    throw new ParsedError(parsed.error.message)
  }

  const userParamsSanitized = parsed.data
  await updateUserByUidDao(userParamsSanitized, resourceUid)
  return userBeforeUpdate
}
export const getUser = async () => {
  const session = await getSessionAuth()

  if (!session) return
  const uid = session.user?.id ?? ''

  return await getUserByIdDao(uid)
}
export const getUserId = async () => {
  const user = await getUser()
  if (!user) return
  return user.id
}

export const getUserById = async (id: string) => {
  const parsed = userUuidSchema.safeParse(id)
  if (!parsed.success) {
    throw new ParsedError(parsed.error.message)
  }
  const parsedUuid = parsed.data
  const granted = await canReadUser(parsedUuid)

  if (!granted) {
    throw new GrantedError()
  }
  return await getUserByIdDao(parsedUuid)
}

export const getUserByEmail = async (email: string) => {
  const parsed = baseUserServiceSchema.safeParse({email})
  if (!parsed.success) {
    throw new ParsedError(parsed.error.message)
  }
  const emailParamsSanitized = parsed.data.email
  return await getUserByEmailDao(emailParamsSanitized)
}

export const getPublicUsersWithPagination = async (
  page: number,
  limit: number
) => {
  await new Promise((resolve) => setTimeout(resolve, 5000))
  // turn page into offset & limit data per page
  const offset = (page - 1) * 10

  const usersPagination = await getPublicUsersWithPaginationDao({limit, offset})

  if (!usersPagination) return

  return {
    data: usersPagination.data,
    pagination: {
      page,
      pageSize: usersPagination.pagination.pageSize,
      rowCount: usersPagination.pagination.rowCount,
    },
  }
}
