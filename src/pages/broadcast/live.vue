<template>
  <div style="margin: 10% 10% 0 10%;">
    <div class="q-mb-lg row justify-between">
      <div class="q-gutter-sm row items-center">
        <div>
          <q-icon name="svguse:icons.svg#view-grid-fill" size="sm" color="green" />
        </div>
        <div class="name">Live</div>
        <div class="caption">방송구간이 있습니다</div>
      </div>
      <q-btn rounded>방송시작</q-btn>
    </div>
    <div class="row q-gutter-md">
      <SelectBroadcastZones :locations="locations"/>
      <ZonePreset />
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import SelectBroadcastZones from '@components/broadcast/zoneSelect'
import ZonePreset from '@components/broadcast/zonePreset'

export default {
  components: { SelectBroadcastZones, ZonePreset },
  setup () {
    const { state, dispatch } = useStore()

    const selected = ref([])
    const locations = computed(() => state.locations.locations)

    onMounted(() => {
      dispatch('user/getUser')
      dispatch('locations/updateLocations')
    })

    return {
      selected,
      locations
    }
  }
}
</script>
