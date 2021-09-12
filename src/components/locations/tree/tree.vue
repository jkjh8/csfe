<template>
  <q-card class="shadow-15 location_card">
    <q-card-section class="q-pa-none" style="overflow: hidden;">
      <q-img src="/background/cover_2.jpg" style="height: 6rem;">
        <div class="fit row justify-between items-center">
          <div class="row q-gutter-sm">
            <q-icon name="svguse:icons.svg#view-list" size="1.5rem" />
            <div>Zones</div>
          </div>
        </div>
      </q-img>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-pa-none" style="height: 480px;">
      <q-tree
        class="q-px-md"
        :nodes="tree"
        node-key="index"
      >
      </q-tree>
    </q-card-section>
  </q-card>
</template>

<script>
import { computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'

export default {
  setup () {
    const { state } = useStore()
    // const tree = ref([])
    const locations = computed(() => state.locations.locations)
    const zones = computed(() => state.zones.zones)

    const tree = computed(() => {
      const rt = []
      locations.value.forEach(location => {
        const children = []
        zones.value.forEach(zone => {
          if (zone.parent.index === location.index) {
            children.push({ _id: zone._id, channel: zone.channel, label: zone.name })
          }
        })
        console.log(location)
        rt.push({ _id: location._id, index: location.index, label: location.name, children: children })
      })
      console.log(rt)
      return rt
    })

    onBeforeMount(() => {
      //
    })
    return {
      tree
    }
  }
}
</script>

<style scoped>
/deep/ .q-img__image {
  -webkit-filter: blur(4px);
  filter: blur(4px);
}
</style>
