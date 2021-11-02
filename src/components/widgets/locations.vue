<template>
  <q-card
    class="card-small"
    style="height: 18rem;"
  >
    <q-card-section>
      <div class="row items-center">
        <q-icon
          name="svguse:iconsColor.svg#location"
          size="md"
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
        <div>
          현재 방송 구간은 <strong>{{ count.masters }}</strong> 개의 지역, <strong>{{ count.zones }}</strong> 개의 방송구간이 있습니다.
        </div>
        <br>
        <div>
          현재 <strong>{{ count.active }}</strong>개의 방송구간이 방송중입니다.
        </div>
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
import { socket } from '@/boot/socketio'

export default {
  setup() {
    const { state, getters, dispatch } = useStore()
    const socketId = computed(() => state.user.socketId)
    const count = computed(() => getters['devices/count'])

    onBeforeMount(() => {
      dispatch('devices/updateDevices')
      if (!socketId.value) {
        socket.connect()
      }
    })

    return {
      count,
    }
  }
}
</script>

<style scoped>
.link {
  text-decoration: none;
}
</style>