<template>
  <q-card class="shadow-15 location_card" style="width: 24rem;">
    <q-card-section class="backg" style="height: 4rem;">
      <div class="q-ml-sm fit row items-center text-white">
        <q-icon name="svguse:icons.svg#view-list" size="1.5rem" />
        <div class="q-ml-md name">방송구간 프리셋</div>
      </div>
    </q-card-section>
    <q-card-section>
      <q-scroll-area style="height: 28rem;">
        <div>
          {{ selected }}
        </div>
        <div>
          {{ group }}
        </div>
      </q-scroll-area>
    </q-card-section>
  </q-card>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
// import { api } from '@api/axios'

export default {
  setup () {
    const { state, getters } = useStore()
    const selected = computed(() => state.locations.selectedId)
    const group = computed(() => getters['locations/selectedGroup'])

    return {
      selected,
      group
    }
  }
}
</script>

<style scoped>
.backg {
  background: linear-gradient(110deg, #6e2222, #741111, #121212)
}
</style>
