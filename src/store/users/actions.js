import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
// Api
import { areaName } from './constants'
import {
  blockUserApi,
  deleteUserApi,
  disableUserApi,
  enableUserApi,
  getUserApi,
  getUserImagesApi,
  getUsersApi,
  unblockUserApi,
  updateUserApi,
} from './api'

/**
 * Получение всех юзеров
 */
export const getUsersAction = createAsyncThunk(
  `${areaName}/get`,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await getUsersApi(payload)
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
 * Удаление юзера
 */
export const deleteUserAction = createAsyncThunk(
  `${areaName}/delete`,
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteUserApi(id)
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
 * Получение юзера
 */
export const getUserAction = createAsyncThunk(
  `${areaName}/getUser`,
  async (id, { rejectWithValue }) => {
    try {
      const response = await getUserApi(id)
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
 * Обновление юзера
 */
export const updateUserAction = createAsyncThunk(
  `${areaName}/update`,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await updateUserApi(payload)
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
 * Получение изображений юзера
 */
export const getUserImagesAction = createAsyncThunk(
  `${areaName}/getImage`,
  async (arr, { rejectWithValue }) => {
    try {
      const promiseArr = arr.map((id) => getUserImagesApi(id))
      const response = await Promise.all(promiseArr)

      return response.map((item) => item.data.data.attributes)
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
 * Блокировка юзера
 */
export const blockUserAction = createAsyncThunk(
  `${areaName}/block`,
  async (id, { rejectWithValue }) => {
    try {
      const response = await blockUserApi(id)
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
 * Разблокировка юзера
 */
export const unblockUserAction = createAsyncThunk(
  `${areaName}/unblock`,
  async (id, { rejectWithValue }) => {
    try {
      const response = await unblockUserApi(id)
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
 * Активировать юзера
 */
export const enableUserAction = createAsyncThunk(
  `${areaName}/enable`,
  async (id, { rejectWithValue }) => {
    try {
      const response = await enableUserApi(id)
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
 * Деактивировать юзера
 */
export const disableUserAction = createAsyncThunk(
  `${areaName}/disable`,
  async (id, { rejectWithValue }) => {
    try {
      const response = await disableUserApi(id)
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
