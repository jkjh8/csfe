<template>
  <q-card
    flat
    style="border: solid 1px #eee; border-radius: 1rem;"
  >
    <q-card-section class="bg-blue-grey-1">
      <div class="row no-wrap q-gutter-md q-pr-sm items-center">
        <q-avatar class="avatar" size="1.5rem">
          <q-icon name="svguse:icons.svg#server" size="md" />
          <q-badge v-if="!zone.status" floating rounded color="red"/>
        </q-avatar>
        <div class="statusName">
          {{ zone.name }}
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="row justify-between">
          <span class="statustext">상태</span>
          <span>{{ zone.status ? '정상':'점검필요' }}</span>
        </div>
        <div class="row justify-between">
          <span class="statustext">IP</span>
          <span v-if="zone.device && zone.device.ipaddress">
            <a :href="`http://${zone.device.ipaddress}`" target="_blank">
              {{ zone.device.ipaddress }}
            </a>
          </span>
          <span v-else>No IP</span>
        </div>
        <div class="row justify-between">
          <span class="statustext">방송채널</span>
          <span>{{ zone.channel }}</span>
        </div>
    </q-card-section>
  </q-card>
</template>

<script>
// import { onMounted } from 'vue'
// import { useStore } from 'vuex'

export default {
  props: ['zone'],
  setup (props) {
    //
  }
}
</script>

<style scoped>
.avatar {
  border: solid 1px #ddd;
}
.statusName {
  font-family: 나눔고딕;
  font-weight: 700;
}
</style>
