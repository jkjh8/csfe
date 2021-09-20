import { api } from '../../boot/axios'
export async function updateLocations ({ commit }) {
  try {
    const r = await api.get('/locations')
    commit('updateLocations', r.data)
  } catch (error) {
    console.log('location update error', error)
    commit('updateCount', 0)
    commit('updateLocations', [])
  }
}

export async function getZonePreset ({ commit }, user) {
  try {
    const r = await api.get(`/broadcast/preset?user_id=${user}`)
    commit('updateZonePresets', r.data)
  } catch (error) {
    console.error('get zone preset error', error)
  }
}
