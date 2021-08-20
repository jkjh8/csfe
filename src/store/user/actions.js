import { api } from '../../boot/axios'
export async function getUser ({ commit }) {
  try {
    let user = await api.get('/auth/getUser')
    if (!user) {
      user = await api.get('/auth/refUser')
    }
    return commit('updateUser', user.data.user)
  } catch (err) {
    console.log('checkUserError', err)
  }
}
