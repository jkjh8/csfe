import { api } from '../../boot/axios'

export async function updateZones ({ commit }) {
  try {
    const r = await api.get('/zones')
    console.log(r)
    commit('updateCount', r.data.data.count)
    commit('updateZones', r.data.data)
  } catch (error) {
    console.log('Zones update error', error)
    commit('updateCount', 0)
    commit('updateZones', [])
  }
}
