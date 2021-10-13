<template>
  <q-card class="card-full">
    <q-card-section>
      <q-table
        flat
        :columns="[
          { name: 'start', label: '시작시간', field: 'start', sortable: true },
          { name: 'name', label: '예약명', field: 'name', sortable: true },
          { name: 'mode', label: '모드', field: 'mode', sortable: true },
          { name: 'file', label: '재생파일', field: 'file' },
          { name: 'description', label: '상세설명', field: 'description' },
          { name: 'actions', label: '기능' }
        ]"
        :rows="schedules"
      />
    </q-card-section>
  </q-card>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  setup() {
    const { state } = useStore()
    const schedules = computed(() => state.broadcast.schedules)
    return { schedules }
  }
}
</script>
