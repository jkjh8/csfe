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
