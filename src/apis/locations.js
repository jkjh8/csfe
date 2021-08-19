import { useStore } from 'vuex'
import { api } from '../boot/axios'

const getLocations = async function () {
  const store = useStore()
  const r = await api.get('/locations')
  store.dispatch('locations/updateLocations', r.data.data)
}

export { getLocations }
