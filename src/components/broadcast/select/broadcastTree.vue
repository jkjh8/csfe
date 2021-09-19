<template>
  <q-tree
    :nodes="locations"
    tick-strategy="leaf"
    node-key="_id"
    v-model:ticked="selected"
    @update:ticked="update"
  >
    <template v-slot:default-header="props">
      <div>
        {{ props.node.name }}
      </div>
    </template>
  </q-tree>
</template>

<script>
import { computed, toRefs } from 'vue'
import { useStore } from 'vuex'

export default {
  props: ['locations'],
  setup (props) {
    const { locations } = toRefs(props)
    const { state, getters, commit } = useStore()

    const group = computed(() => getters['locations/selectedGroup'])
    const selected = computed({
      get () { return state.locations.selectedId },
      set (value) { commit('locations/updateSelectedId', value) }
    })

    function update () {
      const r = {
        locations: [],
        zones: []
      }
      selected.value.forEach(id => {
        locations.value.forEach(location => {
          if (id === location._id) {
            r.locations.push(location)
          }
          location.children.forEach(e => {
            if (id === e._id) {
              r.zones.push(e)
            }
          })
        })
      })
      commit('locations/updateBroadcast', r)
      return r
    }

    return {
      selected,
      group,
      update
    }
  }
}
</script>
