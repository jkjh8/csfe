<template>
  <div style="margin: 10% 10% 0 10%;">
      <div class="q-gutter-sm q-mb-md">
        <span>
          <q-icon name="svguse:icons.svg#view-grid-fill" size="sm" color="green" />
        </span>
        <span class="name">Status</span>
        <span class="caption">방송구간이 있습니다</span>
      </div>
      <div class="shadow-15 q-pa-md status" style="border-radius: 2rem;">
        <q-list>
          <div v-for="location in locations" :key="location.index">
            <q-expansion-item
              class="overflow-hidden exp-style"
              expand-separator
              default-opened
            >
              <!--  헤더  -->
              <template v-slot:header>
                <q-item-section avatar>
                  <q-avatar style="border: 1px solid #454545" size="2rem">
                    <q-icon name="svguse:icons.svg#map"></q-icon>
                    <q-badge v-if="!location.status" rounded floating color="red" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="name">
                    {{ location.name }}
                  </q-item-label>
                  <q-item-label caption>
                    {{ location.ipaddress }}
                  </q-item-label>
                </q-item-section>
              </template>

              <!-- 지역표시 -->
              <div class="fit row wrap q-gutter-md" style="padding: 1rem 2rem;">
                <div v-for="zone in location.children" :key="zone.channel">
                  <ZoneStatus :location="location" :zone="zone" />
                </div>
              </div>
            </q-expansion-item>
          </div>
        </q-list>
      </div>
  </div>
</template>

<script>
import { computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'

import ZoneStatus from '../../components/broadcast/zoneStatus.vue'

export default {
  components: { ZoneStatus },
  setup () {
    const { state, dispatch } = useStore()
    const locations = computed(() => state.locations.locations)

    function getIp (obj) {
      return obj.ipaddress
    }

    onBeforeMount(async () => {
      dispatch('locations/updateLocations')
      dispatch('locations/updateZones')
    })

    return {
      locations,
      getIp
    }
  }
}
</script>

<style scoped>
.statustext {
  font-family: 나눔고딕;
  font-weight: 700;
}
.status {
  background: #fafafa;
}
.exp-style {
  border: dashed 1px #fafafa;
  border-radius: 1rem;
}
</style>
