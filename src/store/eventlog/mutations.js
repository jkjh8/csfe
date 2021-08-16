export function updateLogs (state, payload) {
  state.logs = payload
}

export function updateLogsCount (state, payload) {
  state.count = payload
}

export function updatePage (state, payload) {
  state.page = payload
}

export function updateLogsPerPage (state, payload) {
  state.logsPerPage = payload
}
