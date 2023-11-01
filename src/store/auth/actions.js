import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { areaName } from './constants'
import { authApi } from './api'

/**
 * Авторизация
 */
export const authAction = createAsyncThunk(
  `${areaName}/auth`,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await authApi(payload)

      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data

        // Нужно обработать кейс, когда с бэка приходит сообщение об ошибке
        if (data?.statusCode || data?.error || data?.message) {
          return rejectWithValue({ ...data })
        }
      }

      return rejectWithValue({
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  }
)
