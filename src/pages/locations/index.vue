<template>
  <div class="colume q-gutter-lg" style="padding: 5% 10% 0 10%">
    <div class="row items-center q-ml-lg q-mb-lg">
      <div class="row items-center q-gutter-sm">
        <q-icon name="svguse:icons.svg#server-fill" size="sm" color="teal" />
        <span class="name">방송구간</span>
        <span class="caption">총 {{ locationsCount }}개 지역의 {{ zonesCount}} 방송구간이 있습니다</span>
      </div>
    </div>
    <div class="row q-gutter-xl">
      <Locations />
      <Zones />
    </div>
  </div>
</template>

<script>
import { onBeforeMount, computed } from 'vue'
import { useStore } from 'vuex'

import Locations from '../../components/locations/list.vue'
import Zones from '../../components/zones/list.vue'
export default {
  components: { Locations, Zones },
  setup () {
    const { state, dispatch, getters } = useStore()
    const count = computed(() => state.locations.count)
    const locationsCount = computed(() => getters['locations/getCount'])
    const zonesCount = computed(() => getters['zones/getCount'])

    onBeforeMount(() => {
      dispatch('user/getUser')
      dispatch('locations/updateLocations')
      dispatch('zones/updateZones')
      dispatch('devices/updateDevices')
    })

    return { count, locationsCount, zonesCount }
  }
}

</script>
