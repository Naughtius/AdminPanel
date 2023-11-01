import { createDraftSafeSelector, createSelector } from '@reduxjs/toolkit'
import { getAsyncRequestAsArraySelector } from '../async-request'
import {
  blockUserAction,
  deleteUserAction,
  disableUserAction,
  enableUserAction,
  getUserAction,
  getUsersAction,
  unblockUserAction,
  updateUserAction,
} from './actions'

const selectSelf = (state) => state

const unsafeSelector = createSelector(selectSelf, (state) => state.users)

export const selectUsers = createDraftSafeSelector(
  unsafeSelector,
  (state) => state.data
)

export const selectUsersPagination = createDraftSafeSelector(
  unsafeSelector,
  (state) => state.pagination
)

export const selectUser = createDraftSafeSelector(
  unsafeSelector,
  (state) => state.user
)

export const selectUserImages = createDraftSafeSelector(
  unsafeSelector,
  (state) => state.userImages
)

export const selectUsersGetRequest = getAsyncRequestAsArraySelector(
  getUsersAction.typePrefix
)

export const selectUserDeleteRequest = getAsyncRequestAsArraySelector(
  deleteUserAction.typePrefix
)

export const selectUserGetRequest = getAsyncRequestAsArraySelector(
  getUserAction.typePrefix
)

export const selectUserUpdateRequest = getAsyncRequestAsArraySelector(
  updateUserAction.typePrefix
)

export const selectBlockUserUpdateRequest = getAsyncRequestAsArraySelector(
  blockUserAction.typePrefix
)

export const selectUnblockUserUpdateRequest = getAsyncRequestAsArraySelector(
  unblockUserAction.typePrefix
)

export const selectDisableUserUpdateRequest = getAsyncRequestAsArraySelector(
  disableUserAction.typePrefix
)

export const selectEnableUserUpdateRequest = getAsyncRequestAsArraySelector(
  enableUserAction.typePrefix
)
