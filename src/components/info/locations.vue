<template>
  <q-card class="card-small">
    <q-card-section>
      <div class="row items-center">
        <q-icon
          name="map"
          size="md"
          color="cyan"
        />
        <div
          class="listname q-ml-sm q-pb-sm"
          style="font-size: 1.1rem;"
        >
          지역정보
        </div>
      </div>
    </q-card-section>

    <q-card-section>
      <div class="text-grey-8 q-px-md q-mb-md">
        현재 방송 구간은 <strong>{{ locationsCount }}</strong> 개의 지역,
        <strong>{{ deviceCount }}</strong> 개의 방송구간이 있습니다
      </div>
    </q-card-section>

    <q-card-section>
      <div class="fit row q-px-md q-pb-md">
        <q-space />
        <router-link
          class="link row items-center"
          to="/locations"
        >
          <span>방송구간설정 바로가기</span>
          <q-icon name="arrow_forward" />
        </router-link>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { computed, onBeforeMount } from 'vue'
import { useStore } from  'vuex'

export default {
  setup() {
    const { getters, dispatch } = useStore()
    const locationsCount = computed(() => getters['locations/getCount'])
    const deviceCount = computed(() => getters['devices/getDeviceCount'])

    onBeforeMount(() => {
      dispatch('locations/updateLocations')
      dispatch('devices/updateDevices')
    })

    return {
      locationsCount,
      deviceCount
    }
  }
}
</script>

<style scoped>
.link {
  text-decoration: none;
}
</style>