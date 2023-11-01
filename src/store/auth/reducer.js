import { createSlice } from '@reduxjs/toolkit'
import { authAction } from './actions'
import { areaName } from './constants'

const initialState = {
  isAuth: false,
}

export const authSlice = createSlice({
  name: areaName,
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuth = false
    },
    signIn: (state) => {
      state.isAuth = true
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(authAction.fulfilled, (draft, { payload }) => {
      localStorage.setItem('token', payload.token)
      draft.isAuth = true
    })
  },
})

export const { logout, signIn } = authSlice.actions

export default authSlice.reducer
