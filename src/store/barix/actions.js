import { api } from '../../boot/axios'
export function updateListAsWebsoket ({ commit }, payload) {
  commit('updateList', payload.rows)
  commit('updateCount', payload.count)
}

export async function updateList ({ commit }) {
  const r = await api.get('/sensors/get')
  commit('updateList', r.data.data.rows)
  commit('updateCount', r.data.data.count)
}
