export function updateLogs ({ commit }, payload) {
  commit('updateLogs', payload.data.rows)
  commit('updateLogsCount', payload.data.count)
  commit('updatePage', payload.page)
  commit('updateRowsPerPage', payload.logsPerPage)
}
