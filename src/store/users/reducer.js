import { createSlice } from '@reduxjs/toolkit'
import { getUserAction, getUserImagesAction, getUsersAction } from './actions'
import { areaName } from './constants'
import { defaultPagination } from '../constants'

const initialState = {
  data: [],
  user: null,
  userImages: [],
  pagination: defaultPagination,
}

export const usersSlice = createSlice({
  name: areaName,
  initialState,
  reducers: {
    clearUserImages: (state) => {
      state.userImages = initialState.userImages
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(getUsersAction.fulfilled, (draft, { payload }) => {
      const {
        data,
        meta: { currentPage, itemsPerPage, totalItems },
      } = payload

      draft.data = data.map((el) => ({
        ...el.attributes,
        relationships: el.relationships,
      }))
      draft.pagination = {
        page: currentPage,
        itemsPerPage,
        totalItems,
      }
    })
    addCase(getUserAction.fulfilled, (draft, { payload }) => {
      const { data } = payload
      draft.user = { ...data.attributes, relationships: data.relationships }
    })
    addCase(getUserImagesAction.fulfilled, (draft, { payload }) => {
      draft.userImages = payload
    })
  },
})

export const { clearUserImages } = usersSlice.actions

export default usersSlice.reducer
