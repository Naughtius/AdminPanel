import { $api } from '@services/index'

export const authApi = async ({ email, password }) =>
  $api.post('/auth/token', {
    email,
    password,
  })
