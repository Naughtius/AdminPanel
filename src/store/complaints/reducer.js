import { createSlice } from '@reduxjs/toolkit'
import { getComplaintsAction } from './actions'
import { areaName } from './constants'
import { defaultPagination } from '../constants'

const initialState = {
  data: [],
  pagination: defaultPagination,
}

export const complaintsSlice = createSlice({
  name: areaName,
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(getComplaintsAction.fulfilled, (draft, { payload }) => {
      const {
        data,
        meta: { totalItems },
      } = payload

      draft.data = data.map((el) => ({
        ...el.attributes,
        relationships: el.relationships,
      }))

      draft.pagination = {
        totalItems,
      }
    })
  },
})

// export const {} = complaintsSlice.actions

export default complaintsSlice.reducer
