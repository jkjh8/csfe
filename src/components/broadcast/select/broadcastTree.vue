<template>
  <q-tree
    :nodes="locations"
    tick-strategy="leaf"
    node-key="_id"
    v-model:ticked="selected"
  >
    <template v-slot:default-header="props">
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
  props: ['locations'],
  setup (props) {
    const { state, getters, commit } = useStore()

    const group = computed(() => getters['locations/selectedGroup'])
    const selected = computed({
      get () { return state.locations.selectedId },
      set (value) {
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
