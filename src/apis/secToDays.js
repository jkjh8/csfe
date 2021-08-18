import moment from 'moment'

export default function (time) {
  const f = moment.duration(time * 1000, 'millisecond')
  const d = Math.floor(f.asDays())
  const h = Math.floor(f.asHours()) - d * 24
  const m = Math.floor(f.asMinutes()) - h * 60
  return d + 'd ' + h + ':' + m
}
