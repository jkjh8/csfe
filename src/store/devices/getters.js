export function getIndexArr (state) {
  return state.deviceList.map(e => e.index)
}

export function getDeviceCount (state) {
  return state.deviceList.length
}
export function QsysList (state) {
  const list = []
  state.deviceList.forEach(e => {
    if (e.type === 'QSys') {
      list.push(e)
    }
  })
  return list
}

export function BarixList (state) {
  const list = []
  state.deviceList.forEach(e => {
    if (e.type === 'Barix') {
      list.push(e)
    }
  })
  return list
}

export function newDeviceCount (state) {
  return state.deviceList.filter(e => e.checked !== true).length
}

export function errorDeviceCount (state) {
  return state.deviceList.filter(e => e.status !== true).length
}
