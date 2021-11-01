<template>
  <div
    class="colume"
    style="padding: 5% 8% 0 8%"
  >
    <div
      class="row items-start q-px-md"
      style="height: 5rem;"
    >
      <div class="row items-center q-gutter-sm">
        <q-icon
          name="svguse:icons.svg#server-fill"
          size="sm"
          color="teal"
        />
        <span class="name">방송구간</span>
        <span class="caption">총 {{ locationsCount }}개 지역의 {{ }} 방송구간이 있습니다</span>
      </div>
    </div>
    <dl class="q-gutter-xl row wrap justify-center">
      <dt>
        <Locations />
      </dt>
      <dt>
        <Zones />
      </dt>
    </dl>
  </div>
</template>

<script>
import { onBeforeMount, computed } from 'vue'
import { useStore } from 'vuex'

import Locations from '@components/locations/locations/list.vue'
import Zones from '@components/locations/zones/list.vue'

export default {
  components: { Locations, Zones },
  setup () {
    const { dispatch, getters } = useStore()
    const locationsCount = computed(() => getters['locations/getCount'])

    onBeforeMount(() => {
      dispatch('user/getUser')
      dispatch('devices/updateDevices')
    })

    return { locationsCount }
  }
}
</script>
