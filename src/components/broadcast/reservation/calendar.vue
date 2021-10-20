<template>
  <div class="subcontent">
    <navigation-bar
      :selected-date="selectedDate"
      @today="onToday"
      @prev="onPrev"
      @next="onNext"
    />
    <div class="row justify-center">
      <div style="display: flex; width: 100%">
        <QCalendarMonth
          ref="calendar"
          v-model="selectedDate"
          :day-min-height="80"
          :locale="locale"
          animated
          bordered
          @change="onChange"
          @moved="onMoved"
          @click-date="onClickDate"
          @click-day="onClickDay"
          @click-workweek="onClickWorkweek"
          @click-head-workweek="onClickHeadWorkweek"
          @click-head-day="onClickHeadDay"
        >
          <template #day="{ scope: { timestamp } }">
            <template
              v-for="event in eventsMap[timestamp.date]"
              :key="event.id"
            >
              <div>
                <div class="titile q-calendar__ellipsis">
                  <q-btn class="full-width bg-cyan text-white">
                    {{ event.name }}
                  </q-btn>
                </div>
              </div>
            </template>
          </template>
        </QCalendarMonth>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
import { api } from '@/boot/axios'
import moment from 'moment'

import { QCalendarMonth, today, addToDate, parseTimestamp } from '@quasar/quasar-ui-qcalendar/src/index.js'
import '@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarMonth.sass'

import NavigationBar from './navigationBar.vue'
export default {
  components: { NavigationBar, QCalendarMonth },
  setup () {
    const calendar = ref(null)
    const selectedDate = ref(today()),
      selectedMonth = reactive([]),
      year = ref(new Date().getFullYear()),
      locale = ref('ko-KR'),
      events = ref([])

    const eventsMap = computed(() => {
      const map = {}
      if (events.value.length > 0) {
        events.value.forEach(event => {
          (map[ event.date ] = (map[ event.date ] || [])).push(event)
          if (event.days !== undefined) {
            console.log('not days')
            let timestamp = parseTimestamp(event.date)
            let days = event.days
            // add a new event for each day
            // skip 1st one which would have been done above
            do {
              timestamp = addToDate(timestamp, { day: 1 })
              if (!map[ timestamp.date ]) {
                map[ timestamp.date ] = []
              }
              map[ timestamp.date ].push(event)
              // already accounted for 1st day
            } while (--days > 1)
          }
        })
      }
      console.log('map', map)
      return map
    })

    function onToday () {
      console.log('Today')
      console.log(calendar.value)
      calendar.value.moveToToday()
    }
    function onPrev () {
      console.log('Prev')
      calendar.value.prev()
    }
    function onNext() {
      calendar.value.next()
    }

    function onChange (data) {
      console.log('onChange', data)
      selectedMonth.splice(0, selectedMonth.length, ...data.days)
      for (let index = 0; index < selectedMonth.length; index++) {
        if (selectedMonth[index].day === 1) {
          year.value = selectedMonth[index].year
          break
        }
      }
      console.log(selectedMonth, year.value)
    }

    async function fnGetSchedules () {
      const start = Date.parse(selectedMonth[0].date)
      const end = Date.parse(selectedMonth[selectedMonth.length - 1].date)
      const r = await api.get(`/broadcast/schedules?start=${start}&end=${end}`)
      console.log(r)
      events.value = r.data
    }

    onMounted(async () => {
      moment.locale('KR')
      console.log('mounted', selectedMonth, Date.parse(selectedMonth[0].date), Date.parse(selectedMonth[selectedMonth.length - 1].date))
      await fnGetSchedules()
    })

    return {
      calendar,
      selectedDate,
      locale,
      eventsMap,
      onToday,
      onPrev,
      onNext,
      onMoved (data) {
      console.log('onMoved', data)
      },
      onChange,
      onClickDate (data) {
        console.log('onClickDate', data)
      },
      onClickDay (data) {
        console.log('onClickDay', data)
      },
      onClickWorkweek (data) {
        console.log('onClickWorkweek', data)
      },
      onClickHeadDay (data) {
        console.log('onClickHeadDay', data)
      },
      onClickHeadWorkweek (data) {
        console.log('onClickHeadWorkweek', data)
      }
      }
  }
}
</script>
