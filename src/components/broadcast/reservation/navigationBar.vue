<template>
  <div class="fit row justify-between">
    <div>
      <q-icon
        name="svguse:icons.svg#calendar-color"
        size="1.2rem"
      />
      <span
        class="listname q-ml-sm"
      >
        현제 달력은 {{ year }}년 {{ month }}월 입니다.
      </span>
    </div>
    <div>
      <q-btn
        class="q-mx-md"
        rounded
        unelevated
        size="sm"
        color="blue-1"
        text-color="grey-8"
        @click="$emit('today')"
      >
        오늘바로가기
      </q-btn>
      <q-btn
        round
        flat
        icon="svguse:icons.svg#chevron-left"
        size="sm"
        @click="$emit('prev')"
      >
        <q-tooltip
          anchor="top middle"
          self="bottom middle"
          :offset="[10, 10]"
          :delay="500"
        >
          이전달
        </q-tooltip>
      </q-btn>
      <q-btn
        round
        flat
        icon="svguse:icons.svg#chevron-right"
        size="sm"
        @click="$emit('next')"
      >
        <q-tooltip
          anchor="top middle"
          self="bottom middle"
          :offset="[10, 10]"
          :delay="500"
        >
          다음달
        </q-tooltip>
      </q-btn>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import moment from 'moment'

export default {
  props: { selectedDate: String },
  emits: ['prev', 'next', 'today'],
  setup (props) {
    const year = computed(() => {
      return moment(props.selectedDate).format('YYYY')
    })

    const month = computed(() => { return moment(props.selectedDate).format('MM')})
    const day = computed(() => { return moment(props.selectedDate).format('DD')})

    return {
      year,
      month,
      day
    }
  }
}
</script>
