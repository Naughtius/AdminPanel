import { createSlice } from '@reduxjs/toolkit'
import is from '@sindresorhus/is'

import { areaName, asyncRequestDefaultItem } from './constants'

const initialState = {}

const stripActionTypeStatus = (action) =>
  action.type.replace(new RegExp(`/${action.meta.requestStatus}$`), '')

const asyncRequestSlice = createSlice({
  name: areaName,
  initialState,
  reducers: {},
  extraReducers: ({ addMatcher }) => {
    // На запрос
    addMatcher(
      (action) => action.type.endsWith('/pending'),
      (draft, action) => {
        const actionType = stripActionTypeStatus(action)

        draft[actionType] = {
          ...asyncRequestDefaultItem,
          ...draft[actionType],
          loading: true,
        }
      }
    )

    // На успешный ответ
    addMatcher(
      (action) => action.type.endsWith('/fulfilled'),
      (draft, action) => {
        const actionType = stripActionTypeStatus(action)

        draft[actionType] = asyncRequestDefaultItem
      }
    )

    // На неуспешный ответ или какую-либо другую ошибку
    addMatcher(
      (action) => action.type.endsWith('/rejected'),
      (draft, action) => {
        const actionType = stripActionTypeStatus(action)

        draft[actionType] = {
          ...asyncRequestDefaultItem,
          ...draft[actionType],
          loading: asyncRequestDefaultItem.loading,
          error: [
            // При использовании `rejectWithValue` нет нужной информации
            action.meta.rejectedWithValue ? '' : action.error.message,
            // Информация с бэка, вшитая в тело ответа (требует использования `rejectWithValue`)
            ...(is.plainObject(action.payload)
              ? [
                  action.payload['statusCode'],
                  action.payload['error'],
                  action.payload['message'],
                ].filter(is.string)
              : []),
          ]
            .filter(Boolean)
            .join(', '),
        }
      }
    )
  },
})

export default asyncRequestSlice.reducer
