/*
export function someAction (context) {
}
*/
export function updateList ({ commit }, payload) {
  commit('updateList', payload.rows)
  commit('updateCount', payload.count)
}
