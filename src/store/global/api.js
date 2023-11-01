import { $apiWithToken } from '@services/index'

export const getInterestsApi = async (params) =>
  $apiWithToken.get('/user/interests', {
    params,
  })

export const getLanguagesApi = async (params) =>
  $apiWithToken.get('/user/languages', {
    params,
  })
