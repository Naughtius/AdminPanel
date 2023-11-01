import { createSlice } from '@reduxjs/toolkit'
import { getInterestsAction, getLanguagesAction } from './actions'
import { areaName } from './constants'

const initialState = {
  interests: [],
  languages: [],
}

export const globalSlice = createSlice({
  name: areaName,
  initialState,
  reducers: {
    clearUserImages: (state) => {
      state.userImages = initialState.userImages
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(getInterestsAction.fulfilled, (draft, { payload }) => {
      const { data } = payload
      draft.interests = data.map((item) => item.attributes)
    })
    addCase(getLanguagesAction.fulfilled, (draft, { payload }) => {
      const { data } = payload
      draft.languages = data.map((item) => item.attributes)
    })
  },
})

export const { clearUserImages } = globalSlice.actions

export default globalSlice.reducer
