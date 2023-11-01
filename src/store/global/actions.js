import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
// Api
import { areaName } from './constants'
import { getInterestsApi, getLanguagesApi } from './api'

/**
 * Получение всех интересов
 */
export const getInterestsAction = createAsyncThunk(
  `${areaName}/interests`,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await getInterestsApi(payload)
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

/**
 * Получение всех языков
 */
export const getLanguagesAction = createAsyncThunk(
  `${areaName}/languages`,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await getLanguagesApi(payload)
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
