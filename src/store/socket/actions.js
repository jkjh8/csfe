import moment from 'moment'

export function lastUpdate ({ commit }) {
  commit('lastUpdate', moment().format('YYYY/MM/DD hh:mm:ss a'))
}
