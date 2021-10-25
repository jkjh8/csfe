// 캘린더 데이터 vuex로 변경 필요
<template>
  <div class="subcontent">
    <navigation-bar
      :selected-date="selectedDate"
      @today="onToday"
      @prev="onPrev"
      @next="onNext"
    />
    <div class="row justify-center">
      <div style="display: flex; width: 100%; border-radius: 1rem;">
        <QCalendarMonth
          ref="calendar"
          v-model="selectedDate"
          :day-min-height="80"
          :locale="locale"
          :weekdays="[1,2,3,4,5,6,0]"
          animated
          bordered
          month-label-size="xs"
          no-outside-days
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
              <div
                :class="badgeClasses(event, 'day')"
                :style="badgeStyles(event, 'day')"
                class="my-event"
              >
                <div
                  class="title q-calendar__ellipsis"
                  :style="event.active ? `color: ${fnColor.checkColor(event.color)}`:'color: #888'"
                >
                  {{ event.name + (event.time ? ' - ' + event.time : '') }}
                  <q-popup-proxy>
                    <q-card class="popup-card">
                      <q-card-section class="bg-grey-1 row justify-between items-center q-py-sm">
                        <div class="row items-center q-gutter-sm">
                          <q-icon
                            name="svguse:icons.svg#view-grid"
                            size="xs"
                            color="green"
                          />
                          <div class="listname">
                            {{ event.name }}
                          </div>
                        </div>

                        <div class="q-gutter-sm">
                          <q-icon
                            :name="event.active ? 'svguse:icons.svg#check-circle':'svguse:icons.svg#ban'"
                            :color="event.active ? 'green':'red'"
                            size="xs"
                          />
                          <q-btn
                            round
                            flat
                            size="xs"
                            @click="fnClickEvent(event)"
                          >
                            <q-icon
                              name="svguse:icons.svg#cog"
                              size="xs"
                              color="grey"
                            />
                          </q-btn>
                          <q-btn
                            round
                            flat
                            size="xs"
                            @click="fnDelete(event)"
                          >
                            <q-icon
                              name="svguse:icons.svg#trash"
                              size="xs"
                              color="red"
                            />
                          </q-btn>
                        </div>
                      </q-card-section>

                      <q-card-section>
                        <div>
                          <div>
                            반복: {{ event.repeat }}, 시간: {{ event.time }}
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </q-popup-proxy>
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
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'
import { api } from '@/boot/axios'
import moment from 'moment'
moment.locale('ko')

import Schedule from '@components/dialog/schedule'
import Delete from '@components/dialog/delete'
import fnColor from '@/apis/color'

import { QCalendarMonth, today, addToDate, parseTimestamp } from '@quasar/quasar-ui-qcalendar/src/index.js'
import '@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarMonth.sass'

import NavigationBar from './navigationBar.vue'
export default {
  components: { NavigationBar, QCalendarMonth },
  setup () {
    const { state, dispatch } = useStore()
    const $q = useQuasar()
    const calendar = ref(null)

    const events = computed(() => {
      const mapSchedules = []
      const map = {}
      const schedules = state.broadcast.schedules

      selectedMonth.forEach(day => {
        let temp
        if (day.month === month.value) {
          map[day.date] = []
          schedules.forEach(schedule => {
            if (schedule.repeat === '매일') {
              temp = { ...schedule }
              temp.date = day.date
              mapSchedules.push(temp)
              map[day.date].push({ ...schedule })
            }
            if (schedule.repeat === '매주') {
              schedule.week.forEach(week => {
                if (day.week === week) {
                  temp = { ...schedule }
                  temp.date = day.date
                  mapSchedules.push(temp)
                  map[day.date].push({ ...schedule })
                }
              })
            }
            if (schedule.repeat === '한번' && day.date === schedule.date) {
              temp = { ...schedule }
              temp.date = day.date
              temp.days = 6
              mapSchedules.push(temp)
              map[day.date].push({ ...schedule })
            }
          })
        }
      })
      // return map
      return mapSchedules
    })

    //     const events = computed(() => {
    //   const map = {}
    //   const schedules = state.broadcast.schedules

    //   selectedMonth.forEach(day => {
    //     if (day.month === month.value) {
    //       map[day.date] = []
    //       schedules.forEach(schedule => {
    //         if (schedule.repeat === '매일') {
    //           map[day.date].push({ ...schedule })
    //         }
    //         if (schedule.repeat === '매주') {
    //           schedule.week.forEach(week => {
    //             if (moment(day.date).format('dddd') === week) {
    //               map[day.date].push({ ...schedule })
    //             }
    //           })
    //         }
    //         if (schedule.repeat === '한번' && day.date === schedule.date) {
    //           let temp = { ...schedule }
    //           temp.days = 6
    //           map[day.date].push(temp)
    //         }
    //       })
    //     }
    //   })
    //   return map
    // })


    const selectedDate = ref(today()),
      selectedMonth = reactive([]),
      month = ref(1),
      year = ref(new Date().getFullYear()),
      locale = ref('ko-KR')

    const eventsMap = computed(() => {
      $q.loading.show()
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
      $q.loading.hide()
      console.log('map', map)
      return map
    })

    function onToday () {
      calendar.value.moveToToday()
    }
    function onPrev () {
      calendar.value.prev()
    }
    function onNext() {
      calendar.value.next()
    }

    function onChange (data) {
      $q.loading.show()
      console.log('onChange', data)
      selectedMonth.splice(0, selectedMonth.length, ...data.days)
      for (let index = 0; index < selectedMonth.length; index++) {
        selectedMonth[index].week = moment(selectedMonth[index].date).format('dddd')
        if (selectedMonth[index].day === 1) {
          year.value = selectedMonth[index].year
          month.value = selectedMonth[index].month
          break
        }
      }

      for (let index = 0; index < selectedMonth.length; index++) {
        selectedMonth[index].week = moment(selectedMonth[index].date).format('dddd')
      }
      $q.loading.hide()
    }

    function fnClickEvent (item) {
      $q.dialog({
        component: Schedule,
        componentProps: { item: item }
      }).onOk(async (rt) => {
        $q.loading.show()
        try {
          await api.put('/broadcast/schedules', rt)
          await dispatch('broadcast/updateSchedules')
        } catch (err) {
          console.error(err)
        }
        $q.loading.hide()
      })
    }

    function fnDelete(item) {
      $q.dialog({
        component: Delete,
        componentProps: { item: item }
      }).onOk(async (rt) => {
        $q.loading.show()
        try {
          await api.post('/broadcast/schedules/delete', rt)
          await dispatch('broadcast/updateSchedules')
        } catch (err) {
          console.error(err)
        }
        $q.loading.hide()
      })
    }

    onMounted(async () => {
      $q.loading.show()
      try {
        await dispatch('broadcast/updateSchedules')
      } catch (err) {
        console.log(err)
      }
      $q.loading.hide()
    })

    function badgeClasses () {
      return { 'rounded-border': true }
    }

    function badgeStyles (event) {
      const s = {}
      if (event.active) {
        s.background = event.color
        s.color = fnColor.checkColor(event.color)
      } else {
        s.background = '#eee'
        s.color = '#aaa'
      }
      return s
    }

    return {
      badgeStyles,
      badgeClasses,
      calendar,
      selectedDate,
      locale,
      eventsMap,
      events,
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
      },
      fnColor,
      fnClickEvent,
      fnDelete
    }
  }
}
</script>

<style>
.q-calendar-month__day.q-current-day .q-calendar__button {
  border: none;
}
.my-event {
  position: relative;
  font-size: 10px;
  width: 100%;
  margin: 1px 0 0 0;
  justify-content: center;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
}

.title {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.popup-card {
  min-width: 250px;
  border-radius: .5rem;
  font-size:.8rem;
}
.rounded-border {
  border-radius: 2px
}
</style>
