export function getMaxPage (state) {
  return Math.ceil(state.count / state.rowsPerPage)
}
