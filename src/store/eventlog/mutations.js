export function updateLogs (state, payload) {
  state.logs = payload
}

export function updateLogsCount (state, payload) {
  state.count = payload
}

export function updatePage (state, payload) {
  state.page = payload
}

export function updateRowsPerPage (state, payload) {
  state.rowsPerPage = payload
}
