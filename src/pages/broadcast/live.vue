<template>
  <div style="margin: 5%">
    <div class="column">
      <div class="q-mb-lg row justify-between">
        <div class="q-gutter-sm row items-center">
          <div>
            <q-icon
              name="svguse:icons.svg#view-grid-fill"
              size="sm"
              color="green"
            />
          </div>
          <div class="name">
            Live
          </div>
          <div class="caption">
            {{ count.masters }}개의 지역, {{ count.zones }}개의 방송 구간이 있습니다
          </div>
        </div>
      </div>

      <div>
        <Live />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
// import SelectBroadcastZones from '@components/broadcast/zoneSelect'
// import Live from '@components/broadcast/live'
import Live from '@components/broadcast/live/live'

export default {
  components: {
    Live
  },
  setup() {
    const { state, getters, dispatch } = useStore()

    const selected = ref([])
    const user = computed(() => state.user.user)
    const count = computed(() => getters['devices/count'])

    onBeforeMount(() => {
      dispatch('user/getUser')
      dispatch('devices/updateDevices')
    })

    return {
      selected,
      count,
      user
    }
  }
}
</script>
