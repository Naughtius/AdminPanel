import { configureStore } from '@reduxjs/toolkit'
// Api
import { apiSlice } from '@services/apiSlice'
// Reducers
import asyncRequest from '@store/async-request/reducer'
import auth from '@store/auth'
import users from '@store/users'
import global from '@store/global'
import complaints from '@store/complaints'

export const store = configureStore({
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      immutableCheck: true,
      serializableCheck: true,
      thunk: true,
    }),
    apiSlice.middleware,
  ],
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    asyncRequest,
    auth,
    users,
    global,
    complaints,
  },
})
