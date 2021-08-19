/*
export function someAction (context) {
}
*/
export function updateLocations ({ commit }, payload) {
  console.log(payload)
  commit('updateCount', payload.count)
  commit('updateLocations', payload.rows)
}
