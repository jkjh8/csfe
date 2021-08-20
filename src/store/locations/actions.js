import { api } from '../../boot/axios'
export async function updateLocations ({ commit }) {
  try {
    const r = await api.get('/locations')
    commit('updateCount', r.data.data.count)
    commit('updateLocations', r.data.data.rows)
  } catch (error) {
    console.log('location update error', error)
    commit('updateCount', 0)
    commit('updateLocations', [])
  }
}
