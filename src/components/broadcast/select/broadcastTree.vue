<template>
  <q-tree
    v-model:ticked="selected"
    :nodes="locations"
    tick-strategy="leaf"
    node-key="_id"
  >
    <template #default-header="props">
      <div>
        {{ props.node.name }}
      </div>
    </template>
  </q-tree>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  props: { locations: Array },
  setup() {
    const { state, getters, commit } = useStore()

    const group = computed(() => getters['locations/selectedGroup'])
    const selected = computed({
      get() {
        return state.locations.selectedId
      },
      set(value) {
        commit('locations/updateSelectedId', value)
        commit('locations/updateSelectedZonePreset', null)
      }
    })

    return {
      selected,
      group
    }
  }
}
</script>
