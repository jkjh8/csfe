import { api } from '../../boot/axios'
export async function getUser ({ commit }) {
  try {
    let user = await api.get('/auth/getUser')
    if (!user.data.user) {
      user = await api.get('/auth/refUser')
    }
    return commit('updateUser', user.data.user)
  } catch (err) {
    const user = await api.get('/auth/refUser')
    commit('updateUser', user.data.user)
    console.log('checkUserError', err)
  }
}
