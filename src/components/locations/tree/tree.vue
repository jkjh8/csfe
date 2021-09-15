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
        label-key="name"
        node-key="_id"
        tick-strategy="leaf"
        v-model:selected="selected"
        v-model:ticked="ticked"
        v-model:expanded="expanded"
      >
      </q-tree>
    </q-card-section>
  </q-card>

  <div>
    {{ selectedName }}
  </div>
</template>

<script>
import { ref, computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'

export default {
  setup () {
    const { getters } = useStore()
    const selected = ref('')
    const ticked = ref([])
    const expanded = ref([])

    const tree = computed(() => getters['locations/getTree'])

    const selectedName = computed(() => {
      const rt = []
      ticked.value.forEach(e => {
        tree.value.forEach(location => {
          location.children.forEach(zone => {
            if (zone._id === e) {
              rt.push(zone)
            }
          })
        })
      })
      return rt
    })

    onBeforeMount(() => {
      //
    })
    return {
      tree,
      selected,
      ticked,
      expanded,
      selectedName
    }
  }
}
</script>

<style scoped>
:deep(.q-img__image) {
  -webkit-filter: blur(4px);
  filter: blur(4px);
}
</style>
