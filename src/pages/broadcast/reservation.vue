<template>
  <div style="margin: 10% 10% 0 10%">
    <div class="q-gutter-sm q-mb-md">
      <span>
        <q-icon
          name="svguse:icons.svg#view-grid-fill"
          size="sm"
          color="green"
        />
      </span>
      <span class="name">Reservation</span>
      <span class="caption">방송구간이 있습니다</span>
    </div>
    <RTable> // </RTable>
  </div>
</template>

<script>
import { onBeforeMount } from 'vue'
import { useStore } from 'vuex'

import RTable from '@components/broadcast/reservation/table'
export default {
  components: { RTable },
  setup() {
    const { dispatch } = useStore()

    onBeforeMount(() => {
      dispatch('user/getUser')
    })
  }
}
</script>
