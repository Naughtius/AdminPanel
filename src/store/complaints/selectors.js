import { createDraftSafeSelector, createSelector } from '@reduxjs/toolkit'
import { getAsyncRequestAsArraySelector } from '../async-request'
import { getComplaintsAction } from './actions'

const selectSelf = (state) => state

const unsafeSelector = createSelector(selectSelf, (state) => state.complaints)

export const selectComplaints = createDraftSafeSelector(
  unsafeSelector,
  (state) => state.data
)

export const selectComplaintsPagination = createDraftSafeSelector(
  unsafeSelector,
  (state) => state.pagination
)

export const selectComplaint = createDraftSafeSelector(
  unsafeSelector,
  (state) => state.complaint
)

export const selectComplaintsGetRequest = getAsyncRequestAsArraySelector(
  getComplaintsAction.typePrefix
)
