<template>
  <div>
    <q-select
      v-if="schedule"
      v-model="schedule.repeat"
      filled
      dense
      label="반복"
      :options="['한번', '매일', '매주']"
      @update:model-value="$emit('updateRepeat', $event)"
    />
  </div>
  <div v-if="schedule">
    <q-input
      v-if="schedule.repeat === '한번'"
      v-model="schedule.date"
      dense
      filled
      label="날자선택"
      @update:model-value="$emit('updateDate', $event)"
    >
      <template #append>
        <q-icon
          name="event"
          class="cursor-pointer"
        >
          <q-popup-proxy
            ref="qDateProxy"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date
              v-model="schedule.date"
              mask="YYYY-MM-DD"
              @update:model-value="$emit('updateDate', $event)"
            >
              <div class="row items-center justify-end">
                <q-btn
                  v-close-popup
                  label="Close"
                  color="primary"
                  flat
                />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <!-- 매일 -->
    <q-select
      v-if="schedule.repeat ==='매주'"
      v-model="schedule.week"
      class="q-my-md"
      filled
      dense
      multiple
      use-chips
      stack-label
      label="요일 선택"
      :options="['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일']"
      @update:model-value="$emit('updateWeek', $event)"
    />
    <q-input
      v-model="schedule.time"
      class="q-mt-sm"
      filled
      dense
      mask="time"
      label="시간선택"
      :rules="['time']"
      @update:model-value="$emit('updateTime', $event)"
    >
      <template #append>
        <q-icon
          name="access_time"
          class="cursor-pointer"
        >
          <q-popup-proxy
            transition-show="scale"
            transition-hide="scale"
          >
            <q-time
              v-model="schedule.time"
              @update:model-value="$emit('updateTime', $event)"
            >
              <div class="row items-center justify-end">
                <q-btn
                  v-close-popup
                  label="Close"
                  color="primary"
                  flat
                />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
// import moment from 'moment'

export default {
  props: { items: Object },
  emits: [
    'updateRepeat',
    'updateWeek',
    'updateDate',
    'updateTime'
  ],

  setup (props) {
    const schedule = ref(null)

    onMounted(() => {
      schedule.value = { ...props.items }
    })
    
    return {
      schedule
    }
  }
}
</script>

