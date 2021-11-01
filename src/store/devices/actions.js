import { api } from '../../boot/axios'
export function updateListAsWebsoket ({ commit }, payload) {
  commit('updateList', payload)
}

export async function updateDevices ({ commit }, payload) {
  const masters = []
  const slaves = []
  const r = await api.get(`/devices?id=${payload}`)
  const devices = r.data.data
  commit('updateList', devices)
  devices.forEach(device => {
    if (device.mode === 'Master') {
      masters.push(device)
    } else {
      slaves.push(device)
    }
  })
  commit('updateMasters', masters)
  commit('updateSlaves', slaves)
}

export async function updateFromSocket ({ commit }, devices) {
  const masters = []
  const slaves = []
  commit('updateList', devices)
  devices.forEach(device => {
    if (device.mode === 'Master') {
      masters.push(device)
    } else {
      slaves.push(device)
    }
  })
  commit('updateMasters', masters)
  commit('updateSlaves', slaves)
}
