import { createSelector } from '@reduxjs/toolkit'

import { asyncRequestDefaultItem } from './constants'

export const selectState = (state) => state.asyncRequest

/**
 * Отдает селектор статуса ожидания и ошибки асинхронного экшена
 * как объект со значениями
 *
 * @param actionType - тип асинхронного экшена,
 *                     к значениям которого нужно получить доступ
 */
export const getAsyncRequestAsObjectSelector = (actionType) =>
  createSelector(
    selectState,
    (data) => data[actionType] ?? asyncRequestDefaultItem
  )

/**
 * Отдает селектор статуса ожидания и ошибки асинхронного экшена
 * как массив значений
 *
 * @param actionType - тип асинхронного экшена,
 *                     к значениям которого нужно получить доступ
 */
export const getAsyncRequestAsArraySelector = (actionType) =>
  createSelector(getAsyncRequestAsObjectSelector(actionType), (item) => [
    item.loading,
    item.error,
  ])
