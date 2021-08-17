import moment from 'moment'

export default function (time) {
  return moment(time).format('YYYY/MM/DD hh:mm:ss a')
}
