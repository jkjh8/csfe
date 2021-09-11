<template>
  <div class="colume" style="padding: 5% 8% 0 8%">
    <div class="row items-start q-px-md" style="height: 5rem;">
      <div class="row items-center q-gutter-sm">
        <q-icon name="svguse:icons.svg#server-fill" size="sm" color="teal" />
        <span class="name">방송구간</span>
        <span class="caption">총 {{ locationsCount }}개 지역의 {{ zonesCount}} 방송구간이 있습니다</span>
      </div>
    </div>
    <dl class="row wrap justify-between">
      <dt>
        <Locations />
      </dt>
      <dt>
        <Zones />
      </dt>
      <dt>
        <Tree />
      </dt>
    </dl>
  </div>
</template>

<script>
import { onBeforeMount, computed } from 'vue'
import { useStore } from 'vuex'

import Locations from '@components/locations/locations/list.vue'
import Zones from '@components/locations/zones/list.vue'
import Tree from '@components/locations/tree/tree'
export default {
  components: { Locations, Zones, Tree },
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
