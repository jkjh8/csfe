/*
export function someGetter (state) {
}
*/
export function getIndexArr (state) {
  return state.zones.map(e => e.index)
}
