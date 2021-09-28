import { api } from '../../boot/axios'

export async function getUser({ commit }) {
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

export async function login({ commit }, payload) {
  try {
    const r = await api.post('/auth/login', payload)
    commit('updateUser', r.data.user)
    return null
  } catch (error) {
    return error.response.data.message
  }
}

export async function register({ state }, payload) {
  const user = { ...payload }
  console.log(user)
  user.email = payload.userId
  try {
    const r = await api.post('/auth/register', user)
    state.user
    if (r.status === 200) return null
  } catch (error) {
    return error.response.data.message
  }
}

export async function getUsers({ commit }) {
  const r = await api.get('/auth/users')
  commit('updateUsers', r.data.users)
}
