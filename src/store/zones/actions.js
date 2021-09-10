import { api } from '../../boot/axios'

export async function updateZones ({ commit }, payload) {
  try {
    const r = await api.get(`/zones?id=${payload}`)
    console.log(r)
    commit('updateZones', r.data.data)
  } catch (error) {
    console.log('Zones update error', error)
    commit('updateZones', [])
  }
}
