import moment from 'moment'

export default function (time) {
  moment.locale('ko')
  return moment(time).format('YYYY/MM/DD hh:mm:ss a')
}
