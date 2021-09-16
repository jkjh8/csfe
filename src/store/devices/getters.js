export function getIndexArr (state) {
  return state.devices.map(e => e.index)
}

export function getDeviceCount (state) {
  return state.devices.length
}
export function QsysList (state) {
  const list = []
  state.devices.forEach(e => {
    if (e.type === 'QSys') {
      list.push(e)
    }
  })
  return list
}

export function BarixList (state) {
  const list = []
  state.devices.forEach(e => {
    if (e.type === 'Barix') {
      list.push(e)
    }
  })
  return list
}

export function newDeviceCount (state) {
  return state.devices.filter(e => e.checked !== true).length
}

export function errorCount (state) {
  return state.devices.filter(e => e.status !== true).length
}
