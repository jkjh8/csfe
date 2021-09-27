<template>
  <div class="item">
    <span>Firmware</span>
    <span class="text-uppercase q-pa-none">{{ info.detail.fwname }}</span>
  </div>

  <div class="item">
    <span>IP Address</span>
    <span class="text-uppercase q-pa-none">{{ info.detail.network.ip }}</span>
  </div>
  <div class="item">
    <span>Netmask</span>
    <span class="text-uppercase q-pa-none">{{
      info.detail.network.netmask
    }}</span>
  </div>
  <div class="item">
    <span>Gateway</span>
    <span class="text-uppercase q-pa-none">{{
      info.detail.network.gateway
    }}</span>
  </div>
  <div class="item">
    <span>MAC</span>
    <span class="text-uppercase q-pa-none">{{ info.detail.hardware.mac }}</span>
  </div>
  <div class="item">
    <span>Up Time</span>
    <span class="text-uppercase q-pa-none">{{
      secToDays(info.detail.uptime)
    }}</span>
  </div>

  <q-separator
    class="q-my-sm"
    color="grey-3"
  />
  <div v-if="info.detail.fwname === 'StreamingClientKit'">
    <div class="item">
      <span>Status</span>
      <span class="text-uppercase q-pa-none">{{ info.detail.status }}</span>
    </div>
    <div class="item">
      <span>Audio Out L</span>
      <span class="text-uppercase q-pa-none">{{
        info.detail.audio.outputleft
      }}</span>
    </div>
    <div class="item">
      <span>Audio Out R</span>
      <span class="text-uppercase q-pa-none">{{
        info.detail.audio.outputright
      }}</span>
    </div>
    <div class="item">
      <span>Relay</span>
      <span class="text-uppercase q-pa-none">{{
        info.detail.io.relay1 === '0' ? 'OFF' : 'ON'
      }}</span>
    </div>
    <q-separator
      class="q-my-sm"
      color="grey-3"
    />
    <div class="item">
      <span>Priority Port</span>
      <span class="text-uppercase q-pa-none">{{
        info.detail.streaming.priorityrtpport
      }}</span>
    </div>
    <div class="item">
      <span>URL 1</span>
      <span class="text-uppercase q-pa-none">{{
        info.detail.streaming.stream1
      }}</span>
    </div>
    <div class="item">
      <span>URL 2</span>
      <span class="text-uppercase q-pa-none">{{
        info.detail.streaming.stream2
      }}</span>
    </div>
    <div class="item">
      <span>URL 3</span>
      <span class="text-uppercase q-pa-none">{{
        info.detail.streaming.stream3
      }}</span>
    </div>
  </div>

  <div v-if="info.detail.fwname === 'InstreamerKit'">
    <div class="item">
      <span>Status</span>
      <span class="text-uppercase q-pa-none">{{ info.detail.status }}</span>
    </div>

    <div class="item">
      <span>Audio Input L</span>
      <span class="text-uppercase q-pa-none">{{
        info.detail.audio.inputleft
      }}</span>
    </div>
    <div class="item">
      <span>Audio Input R</span>
      <span class="text-uppercase q-pa-none">{{
        info.detail.audio.inputright
      }}</span>
    </div>
    <div class="item">
      <span>stream 1</span>
      <span class="text-uppercase q-pa-none">{{
        info.detail.streaming.stream1
      }}</span>
    </div>
    <div class="item">
      <span>stream 2</span>
      <span class="text-uppercase q-pa-none">{{
        info.detail.streaming.stream2
      }}</span>
    </div>
    <div class="item">
      <span>stream 3</span>
      <span class="text-uppercase q-pa-none">{{
        info.detail.streaming.stream3
      }}</span>
    </div>
    <div class="item">
      <span>stream 4</span>
      <span class="text-uppercase q-pa-none">{{
        info.detail.streaming.stream4
      }}</span>
    </div>
    <div class="item">
      <span>Relay 1</span>
      <span class="text-uppercase q-pa-none">{{
        info.detail.io.relay1 === '0' ? 'OFF' : 'ON'
      }}</span>
    </div>
  </div>

  <q-separator
    class="q-my-sm"
    color="grey-3"
  />

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
  props: {
    info: Object
  },
  setup() {
    return { timeFormat, secToDays }
  }
}
</script>

<style scoped>
div {
  font-family: 나눔고딕;
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
}
.item {
  flex-direction: row;
}
span {
  display: flex;
  padding: 0.5rem 0 0 0;
}
div > span:first-child {
  font-weight: 700;
  width: 10rem;
}
</style>
