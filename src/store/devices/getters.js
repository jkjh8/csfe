export function getIndexArr (state) {
  return state.devices.map(e => e.index)
}

export function getMaster (state) {
  const list = []
  state.devices.forEach(item => {
    if (item.mode === 'Master') {
      list.push(item)
    }
  })
  return list
}

export function getSlave (state) {
  const list = []
  state.devices.forEach(item => {
    if (item.mode === 'Slave') {
      list.push(item)
    }
  })
  return list
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
