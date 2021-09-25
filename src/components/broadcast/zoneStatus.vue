<template>
  <q-card
    flat
    style="width: 11rem; border: solid 1px #eee; border-radius: 1rem"
  >
    <q-card-section
      :class="getActive(zone.channel) ? 'bg-yellow' : 'bg-blue-grey-1'"
    >
      <div class="row no-wrap q-gutter-md q-pr-sm items-center">
        <q-avatar class="avatar" size="1.5rem">
          <q-icon name="svguse:icons.svg#server" size="md" />
          <q-badge v-if="!zone.status" floating rounded color="red" />
        </q-avatar>
        <div class="statusName">
          {{ zone.name }}
        </div>
      </div>
    </q-card-section>

    <q-card-section>
      <div class="row no-wrap justify-between">
        <span class="statustext">장치상태</span>
        <span :style="zone.status ? 'color: green;' : 'color: red;'">{{
          zone.status ? '정상' : '점검필요'
        }}</span>
      </div>

      <div class="row no-wrap justify-between">
        <span>동작상태</span>
        <span>{{ getActive(zone.channel) ? '방송중' : '대기중' }}</span>
      </div>

      <div class="row no-wrap justify-between">
        <span class="statustext">IP</span>
        <a :href="`http://${zone.ipaddress}`" target="_blank">
          {{ zone.ipaddress }}
        </a>
      </div>

      <div class="row no-wrap justify-between">
        <span class="statustext">방송채널</span>
        <span>{{ zone.channel }}</span>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { ref, onMounted } from 'vue'
// import { useStore } from 'vuex'

export default {
  props: ['location', 'zone'],
  setup(props) {
    const active = ref([])
    onMounted(() => {
      if (props.location && props.location.length) {
        active.value = location.value.active
      } else {
        active.value = null
      }
    })

    function getActive(id) {
      try {
        if (props.location && props.location.length) {
          return location.value.active[id - 1]
        } else {
          return false
        }
      } catch {
        return false
      }
    }
    return {
      getActive
    }
  }
}
</script>

<style scoped>
.avatar {
  border: solid 1px #aaa;
}
.statusName {
  font-family: 나눔고딕;
  font-weight: 700;
}
</style>
