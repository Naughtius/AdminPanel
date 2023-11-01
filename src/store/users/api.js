import { $apiWithToken } from '@services/index'

export const getUsersApi = async (params) =>
  $apiWithToken.get('/user/profiles', {
    params,
  })

export const deleteUserApi = async (id) =>
  $apiWithToken.delete('/user/profiles/' + id)

export const getUserApi = async (id) =>
  $apiWithToken.get('/user/profiles/' + id)

export const updateUserApi = async (payload) =>
  $apiWithToken.patch('/user/profiles/' + payload.id, payload, {
    headers: { 'Content-Type': 'application/merge-patch+json' },
  })

export const blockUserApi = async (id) =>
  $apiWithToken.patch(
    '/user/profiles/' + id + '/block',
    {},
    {
      headers: { 'Content-Type': 'application/merge-patch+json' },
    }
  )

export const getUserImagesApi = async (id) =>
  $apiWithToken.get('/user/profiles/images/' + id)

export const disableUserApi = async (id) =>
  $apiWithToken.patch(
    '/user/profiles/' + id + '/disable',
    {},
    {
      headers: { 'Content-Type': 'application/merge-patch+json' },
    }
  )

export const enableUserApi = async (id) =>
  $apiWithToken.patch(
    '/user/profiles/' + id + '/enable',
    {},
    {
      headers: { 'Content-Type': 'application/merge-patch+json' },
    }
  )

export const unblockUserApi = async (id) =>
  $apiWithToken.patch(
    '/user/profiles/' + id + '/unblock',
    {},
    {
      headers: { 'Content-Type': 'application/merge-patch+json' },
    }
  )
