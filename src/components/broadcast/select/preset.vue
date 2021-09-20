<template>
  <q-list>
    <q-item
      v-for="preset in presets" :key="preset._id"
      style="border-radius: 2rem;"
      active-class="bg-grey-3 text-grey-10"
      clickable v-ripple :active="preset._id === selected"
      @click="selected = preset._id"
    >
      <q-item-section class="q-px-md">
        <q-item-label>{{preset.name}}</q-item-label>
        <q-item-label caption class="text-uppercase">{{preset.type}}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  setup () {
    const { state, commit, dispatch } = useStore()
    const user = computed(() => state.user.user)
    const selected = computed({
      get () { return state.locations.selectedZonePreset },
      set (value) {
        commit('locations/updateSelectedZonePreset', value)
        presets.value.forEach(e => {
          if (e._id === value) {
            commit('locations/updateSelectedId', e.zones_id)
          }
        })
      }
    })
    const presets = computed(() => state.locations.zonePresets)

    onMounted(async () => {
      await dispatch('locations/getZonePreset', user.value.email)
      console.log(presets.value)
    })

    return {
      presets,
      selected
    }
  }
}
</script>
