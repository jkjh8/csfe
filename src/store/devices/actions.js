import { api } from '../../boot/axios'
export function updateListAsWebsoket ({ commit }, payload) {
  commit('updateList', payload)
}

export async function updateDevices ({ commit }) {
  const r = await api.get('/devices')
  commit('updateList', r.data.data)
}
