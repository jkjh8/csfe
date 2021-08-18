import moment from 'moment'

export default function (time) {
  console.log(time)
  const duration = moment.duration(moment().diff(moment(time))).asMinutes()
  if (duration > 5) {
    return false
  } else {
    return true
  }
}
