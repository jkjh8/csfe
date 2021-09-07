<template>
  <div class="item">
    <span>Firmware</span>
    <span class="text-uppercase q-pa-none">{{ deviceData.fwname }}</span>
  </div>

  <div class="item">
    <span>IP Address</span>
    <span class="text-uppercase q-pa-none">{{ deviceData.network.ip }}</span>
  </div>
  <div class="item">
    <span>Netmask</span>
    <span class="text-uppercase q-pa-none">{{ deviceData.network.netmask }}</span>
  </div>
  <div class="item">
    <span>Gateway</span>
    <span class="text-uppercase q-pa-none">{{ deviceData.network.gateway }}</span>
  </div>
  <div class="item">
    <span>MAC</span>
    <span class="text-uppercase q-pa-none">{{ deviceData.hardware.mac }}</span>
  </div>
  <div class="item">
    <span>Up Time</span>
    <span class="text-uppercase q-pa-none">{{ secToDays(deviceData.uptime) }}</span>
  </div>

  <q-separator class="q-my-sm" color="grey-3" />
  <div v-if="deviceData.fwname === 'StreamingClientKit'">
    <div class="item">
      <span>Status</span>
      <span class="text-uppercase q-pa-none">{{ deviceData.status }}</span>
    </div>
    <div class="item">
      <span>Audio Out L</span>
      <span class="text-uppercase q-pa-none">{{ deviceData.audio.outputleft }}</span>
    </div>
    <div class="item">
      <span>Audio Out R</span>
      <span class="text-uppercase q-pa-none">{{ deviceData.audio.outputright }}</span>
      </div>
      <div class="item">
        <span>Relay</span>
        <span class="text-uppercase q-pa-none">{{ deviceData.io.relay1 === '0' ? 'OFF':'ON' }}</span>
      </div>
      <q-separator class="q-my-sm" color="grey-3" />
      <div class="item">
        <span>Priority Port</span>
        <span class="text-uppercase q-pa-none">{{ deviceData.streaming.priorityrtpport }}</span>
      </div>
      <div class="item">
        <span>URL 1</span>
        <span class="text-uppercase q-pa-none">{{ deviceData.streaming.stream1 }}</span>
      </div>
      <div class="item">
        <span>URL 2</span>
        <span class="text-uppercase q-pa-none">{{ deviceData.streaming.stream2 }}</span>
      </div>
      <div class="item">
        <span>URL 3</span>
        <span class="text-uppercase q-pa-none">{{ deviceData.streaming.stream3 }}</span>
      </div>
    </div>

    <div v-if="deviceData.fwname === 'InstreamerKit'">
      <div class="item">
        <span>Status</span>
        <span class="text-uppercase q-pa-none">{{ deviceData.status }}</span>
      </div>

      <div class="item">
        <span>Audio Input L</span>
        <span class="text-uppercase q-pa-none">{{ deviceData.audio.inputleft }}</span>
      </div>
      <div class="item">
        <span>Audio Input R</span>
        <span class="text-uppercase q-pa-none">{{ deviceData.audio.inputright }}</span>
      </div>
      <div class="item">
        <span>stream 1</span>
        <span class="text-uppercase q-pa-none">{{ deviceData.streaming.stream1 }}</span>
      </div>
      <div class="item">
        <span>stream 2</span>
        <span class="text-uppercase q-pa-none">{{ deviceData.streaming.stream2 }}</span>
      </div>
      <div class="item">
        <span>stream 3</span>
        <span class="text-uppercase q-pa-none">{{ deviceData.streaming.stream3 }}</span>
      </div>
      <div class="item">
        <span>stream 4</span>
        <span class="text-uppercase q-pa-none">{{ deviceData.streaming.stream4 }}</span>
      </div>
      <div class="item">
        <span>Relay 1</span>
        <span class="text-uppercase q-pa-none">{{ deviceData.io.relay1 === '0' ? 'OFF':'ON' }}</span>
      </div>
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
