<template>
  <div style="margin: 5% 10% 0 10%">
    <div class="row justify-between items-center">
      <div class="q-gutter-sm q-mb-md">
        <span>
          <q-icon
            name="svguse:icons.svg#view-grid-fill"
            size="sm"
            color="green"
          />
        </span>
        <span class="name">Reservation</span>
        <span class="caption">개의 방송 예약이 있습니다</span>
      </div>
      <div>
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
      </div>
    </div>
    <div class="q-mt-md">
      <RTable />
    </div>
  </div>
  <CU />
</template>

<script>
import { onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'

import { api } from '@/boot/axios'

import RTable from '@components/broadcast/reservation/table'
import CU from '@components/broadcast/reservation/cu'
import Create from '@components/dialog/schedule'

export default {
  components: { RTable, CU },
  setup() {
    const { dispatch } = useStore()
    const $q = useQuasar()

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
      fnCreateSchedule
    }
  }
}
</script>
