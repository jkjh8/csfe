<template>
  <div style="margin: 5% 10% 0 10%">
    <div class="row justify-between items-center">
      <div>
        <span>
          <q-icon
            name="svguse:icons.svg#view-grid-fill"
            size="sm"
            color="green"
          />
        </span>
        <span class="name q-mx-sm">예약방송</span>
        <span class="caption">개의 방송 예약이 있습니다</span>
      </div>
      <div class="row items-center">
        <q-btn
          flat
          round
          @click="fnCreateSchedule"
        >
          <q-icon
            name="svguse:icons.svg#plus-circle"
            size="sm"
            color="teal"
          />
        </q-btn>
        <q-btn
          flat
          round
          @click="fnChangeViewer"
        >
          <q-icon
            :name="mode === 'table' ? 'svguse:icons.svg#calendar':'svguse:icons.svg#view-list'"
            size="sm"
            color="blue"
          />
        </q-btn>
      </div>
    </div>
    <div
      v-if="mode === 'table'"
      class="q-mt-md"
    >
      <Table />
    </div>
    <div
      v-else
      class="q-mt-md"
    >
      <Calendar />
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'

import { api } from '@/boot/axios'

import Table from '@components/broadcast/reservation/table'
import Calendar from '@components/broadcast/reservation/calendar'
import Create from '@components/dialog/broadcast/schedule'

export default {
  components: { Table, Calendar },
  setup() {
    const { dispatch } = useStore()
    const $q = useQuasar()

    const mode = ref('table')

    function fnCreateSchedule () {
      $q.dialog({
        component: Create
      }).onOk(async (item) => {
        $q.loading.show()
        try {
          const r = await api.post('/broadcast/schedules', item)
          console.log(r)
          await dispatch('broadcast/updateSchedules')
        } catch (err) {
          console.error(err)
        }
        $q.loading.hide()
      })
    }

    function fnChangeViewer () {
      if (mode.value === 'table') {
        mode.value = 'calendar'
      } else {
        mode.value = 'table'
      }
    }

    onBeforeMount(() => {
      $q.loading.show()
      try {
        dispatch('user/getUser')
        dispatch('broadcast/updateSchedules')
      } catch (err) {
        console.error(err)
      }
      $q.loading.hide()
    })
    
    return {
      mode,
      fnChangeViewer,
      fnCreateSchedule
    }
  }
}
</script>
