import { api } from '../../boot/axios'
export function updateListAsWebsoket ({ commit }, payload) {
  commit('updateList', payload)
}

export async function updateDevices ({ commit }, payload) {
  const r = await api.get(`/devices?id=${payload}`)
  commit('updateList', r.data.data)
}
