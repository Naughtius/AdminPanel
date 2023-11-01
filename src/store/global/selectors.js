import { createDraftSafeSelector, createSelector } from '@reduxjs/toolkit'
import { getAsyncRequestAsArraySelector } from '../async-request'
import { getInterestsAction } from './actions'

const selectSelf = (state) => state

const unsafeSelector = createSelector(selectSelf, (state) => state.global)

export const selectInterests = createDraftSafeSelector(
  unsafeSelector,
  (state) => state.interests
)

export const selectLanguages = createDraftSafeSelector(
  unsafeSelector,
  (state) => state.languages
)

export const selectInterestsGetRequest = getAsyncRequestAsArraySelector(
  getInterestsAction.typePrefix
)
