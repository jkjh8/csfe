<template>
  <div class="item">
    <span>Device</span>
    <span class="text-uppercase q-pa-none">{{ deviceData.Platform }}</span>
  </div>
  <div class="item">
    <span>Status</span>
    <span class="text-uppercase q-pa-none">{{ deviceData.Status.String }}</span>
  </div>
  <div class="item">
    <span>State</span>
    <span class="text-uppercase q-pa-none">{{ deviceData.State }}</span>
  </div>
  <div class="item">
    <span>IP Address</span>
    <span class="text-uppercase q-pa-none">{{ deviceData.ipaddress }}</span>
  </div>
  <div class="item">
    <span>Design Code</span>
    <span class="text-uppercase q-pa-none">{{ deviceData.DesignCode }}</span>
  </div>
  <div class="item">
    <span>Design Name</span>
    <span class="text-uppercase q-pa-none">{{ deviceData.DesignName }}</span>
  </div>
  <div class="item">
    <span>Emulator</span>
    <span class="text-uppercase q-pa-none">{{ deviceData.IsEmulator }}</span>
  </div>
  <div class="item">
    <span>Redundant</span>
    <span class="text-uppercase q-pa-none">{{ deviceData.IsRedundant }}</span>
  </div>

  <q-separator class="q-my-sm" color="grey-3" />

  <div class="item">
    <span>Created At</span>
    <span>{{ timeFormat(deviceData.createdAt) }}</span>
  </div>
  <div class="item">
    <span>Updated At</span>
    <span>{{ timeFormat(deviceData.updatedAt) }}</span>
  </div>
</template>

<script>
import timeFormat from '../../../apis/timeFormat'
import secToDays from '../../../apis/secToDays'
export default {
  props: ['deviceData'],
  setup (props) {
    return { timeFormat, secToDays }
  }
}
</script>

<style scoped>
div {
  font-family: nanumgothic;
  display: flex;
  flex-direction: column;
}
.item {
  flex-direction: row;
}
span {
  display: flex;
  padding: .5rem 0 0 0;
}
div > span:first-child {
  font-weight: bold;
  width: 10rem;
}
</style>
