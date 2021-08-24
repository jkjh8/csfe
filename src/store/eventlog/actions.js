import { api } from '../../boot/axios'

export function updateLogs ({ commit }, payload) {
  commit('updateLogs', payload.docs)
}

export async function getLogs ({ state, commit }) {
  try {
    const r = await api.get(`/eventlog?limit=${state.logs.limit}&page=${state.logs.page}&search=${state.search}`)
    commit('updateLogs', r.data)
  } catch (error) {
    console.error(error)
  }
}
