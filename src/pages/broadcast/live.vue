<template>
  <div style="margin: 10%">
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
            총 {{ locationCount }}개의 지역 {{ zoneCount }} 방송구간이 있습니다
          </div>
        </div>
      </div>
      <div class="q-gutter-xl row wrap justify-center">
        <div>
          <SelectBroadcastZones />
        </div>
        <div>
          <Live />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import SelectBroadcastZones from '@components/broadcast/zoneSelect'
import Live from '@components/broadcast/live'

export default {
  components: {
    SelectBroadcastZones,
    Live
  },
  setup() {
    const { state, getters, dispatch } = useStore()

    const selected = ref([])
    const user = computed(() => state.user.user)
    const locationCount = computed(() => getters['locations/getCount'])
    const zoneCount = computed(() => getters['devices/getDeviceCount'])

    onMounted(() => {
      dispatch('user/getUser')
      dispatch('locations/updateLocations')
      dispatch('devices/updateDevices')
    })

    return {
      selected,
      locationCount,
      zoneCount,
      user
    }
  }
}
</script>
