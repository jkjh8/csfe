import moment from 'moment'

function secToDays (seconds) {
  const d = parseInt(seconds / 86400)
  const h = parseInt((seconds % 86400) / 3600) < 10 ? '0' + parseInt((seconds % 86400) / 3600) : parseInt((seconds % 86400) / 3600)
  const m = parseInt(((seconds % 86400) / 3600) / 60) < 10 ? '0' + parseInt(((seconds % 86400) / 3600) / 60) : parseInt(((seconds % 86400) / 3600) / 60)
  const s = seconds % 60 < 10 ? '0' + seconds % 60 : seconds % 60

  return d + '일 ' + h + '시' + m + '분' + s + '초'
}

function timeFormat (time) {
  return moment(time).format('YYYY-MM-DD hh:mm:ss a')
}

export default {
  timeFormat,
  secToDays
}
