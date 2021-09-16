<template>
  <div class="item">
    <span>Device</span>
    <span class="text-uppercase q-pa-none">{{ info.detail.Platform }}</span>
  </div>
  <div class="item">
    <span>Status</span>
    <span class="text-uppercase q-pa-none">{{ info.detail.Status.String }}</span>
  </div>
  <div class="item">
    <span>State</span>
    <span class="text-uppercase q-pa-none">{{ info.detail.State }}</span>
  </div>
  <div class="item">
    <span>IP Address</span>
    <span class="text-uppercase q-pa-none">{{ info.detail.ipaddress }}</span>
  </div>
  <div class="item">
    <span>Design Code</span>
    <span class="text-uppercase q-pa-none">{{ info.detail.DesignCode }}</span>
  </div>
  <div class="item">
    <span>Design Name</span>
    <span class="text-uppercase q-pa-none">{{ info.detail.DesignName }}</span>
  </div>
  <div class="item">
    <span>Emulator</span>
    <span class="text-uppercase q-pa-none">{{ info.detail.IsEmulator }}</span>
  </div>
  <div class="item">
    <span>Redundant</span>
    <span class="text-uppercase q-pa-none">{{ info.detail.IsRedundant }}</span>
  </div>

  <q-separator class="q-my-sm" color="grey-3" />

  <div class="item">
    <span>Created At</span>
    <span>{{ timeFormat(info.createdAt) }}</span>
  </div>
  <div class="item">
    <span>Updated At</span>
    <span>{{ timeFormat(info.updatedAt) }}</span>
  </div>
</template>

<script>
import timeFormat from '../../../apis/timeFormat'
import secToDays from '../../../apis/secToDays'
export default {
  props: ['info'],
  setup (props) {
    return { timeFormat, secToDays }
  }
}
</script>

<style scoped>
div {
  font-family: 나눔고딕;
  font-size: .8rem;
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
  font-weight: 700;
  width: 10rem;
}
</style>
