import { $apiWithToken } from '@services/index'

export const getComplaintsApi = async (params) =>
  $apiWithToken.get('/user/reputations', {
    params,
  })

export const getComplaintApi = async (id) =>
  $apiWithToken.get('/user/reputations/' + id)
