import { api } from '../../boot/axios'
export async function updateLocations ({ commit }) {
  try {
    const r = await api.get('/locations')
    commit('updateLocations', r.data.data)
  } catch (error) {
    console.log('location update error', error)
    commit('updateCount', 0)
    commit('updateLocations', [])
  }
}

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
