<template>
  <div class="item">
    <span>Alarm</span>
    <span class="text-uppercase q-pa-none">{{ deviceData.alarm }}</span>
  </div>
  <q-separator class="q-my-sm" color="grey-3" />
  <div class="item">
    <span>IP Address</span>
    <span class="text-uppercase q-pa-none">{{ deviceData.info.network.ip }}</span>
  </div>
  <div class="item">
    <span>Netmask</span>
    <span class="text-uppercase q-pa-none">{{ deviceData.info.network.netmask }}</span>
  </div>
  <div class="item">
    <span>Gateway</span>
    <span class="text-uppercase q-pa-none">{{ deviceData.info.network.gateway }}</span>
  </div>
  <div class="item">
    <span>Netmask</span>
    <span class="text-uppercase q-pa-none">{{ deviceData.info.network.netmask }}</span>
  </div>
  <q-separator class="q-my-sm" color="grey-3" />
  <div v-if="deviceData.info.hardware.fwname === 'StreamingClientKit'">
    <div class="item">
      <span>Status</span>
      <span class="text-uppercase q-pa-none">{{ deviceData.info.status.status }}</span>
    </div>
    <div class="item">
      <span>Media Format</span>
      <span class="text-uppercase q-pa-none">{{ deviceData.info.status.mediaformat }}</span>
    </div>
    <div class="item">
      <span>Bitrate</span>
      <span class="text-uppercase q-pa-none">{{ deviceData.info.status.bitrate }}</span>
    </div>
    <div class="item">
      <span>Streaming Channel</span>
      <span class="text-uppercase q-pa-none">{{ deviceData.info.status.channel }}</span>
    </div>
    <div class="item">
      <span>Error Count</span>
      <span class="text-uppercase q-pa-none">{{ deviceData.info.status.error }}</span>
    </div>
    <div class="item">
      <span>Last error message</span>
      <span class="text-uppercase q-pa-none">{{ deviceData.info.status.errormessage }}</span>
    </div>
    <div class="item">
      <span>Reconnects</span>
      <span class="text-uppercase q-pa-none">{{ deviceData.info.status.reconnects }}</span>
    </div>
    <div class="item">
      <span>Relay</span>
      <span class="text-uppercase q-pa-none">{{ deviceData.info.status.relay1 === '0' ? 'OFF':'ON' }}</span>
    </div>
    <q-separator class="q-my-sm" color="grey-3" />
    <div class="item">
      <span>Priority Port</span>
      <span class="text-uppercase q-pa-none">{{ deviceData.info.streaming.priorityrtpport }}</span>
    </div>
    <div class="item">
      <span>URL 1</span>
      <span class="text-uppercase q-pa-none">{{ deviceData.info.streaming.url1 }}</span>
    </div>
    <div class="item">
      <span>URL 2</span>
      <span class="text-uppercase q-pa-none">{{ deviceData.info.streaming.url2 }}</span>
    </div>
    <div class="item">
      <span>URL 3</span>
      <span class="text-uppercase q-pa-none">{{ deviceData.info.streaming.url3 }}</span>
    </div>
  </div>

  <div v-if="deviceData.info.hardware.fwname === 'InstreamerKit'">
    <div class="item">
      <span>Status</span>
      <span class="text-uppercase q-pa-none">{{ deviceData.info.status.status }}</span>
    </div>
    <div class="item">
      <span>Bitrate Mode</span>
      <span class="text-uppercase q-pa-none">{{ deviceData.info.audio.bitratemode }}</span>
    </div>
    <div class="item">
      <span>Encoding</span>
      <span class="text-uppercase q-pa-none">{{ deviceData.info.audio.encoding }}</span>
    </div>
    <div class="item">
      <span>Audio Gain</span>
      <span class="text-uppercase q-pa-none">{{ deviceData.info.audio.gain }}</span>
    </div>
    <div class="item">
      <span>Input Source</span>
      <span class="text-uppercase q-pa-none">{{ deviceData.info.audio.inputsource }}</span>
    </div>
    <div class="item">
      <span>stream 1</span>
      <span class="text-uppercase q-pa-none">{{ deviceData.info.streaming.stream1 }}</span>
    </div>
    <div class="item">
      <span>stream 2</span>
      <span class="text-uppercase q-pa-none">{{ deviceData.info.streaming.stream2 }}</span>
    </div>
    <div class="item">
      <span>stream 3</span>
      <span class="text-uppercase q-pa-none">{{ deviceData.info.streaming.stream3 }}</span>
    </div>
    <div class="item">
      <span>stream 4</span>
      <span class="text-uppercase q-pa-none">{{ deviceData.info.streaming.stream4 }}</span>
    </div>
    <div class="item">
      <span>stream 5</span>
      <span class="text-uppercase q-pa-none">{{ deviceData.info.streaming.stream5 }}</span>
    </div>
    <div class="item">
      <span>stream 6</span>
      <span class="text-uppercase q-pa-none">{{ deviceData.info.streaming.stream6 }}</span>
    </div>
    <div class="item">
      <span>stream 7</span>
      <span class="text-uppercase q-pa-none">{{ deviceData.info.streaming.stream7 }}</span>
    </div>
    <div class="item">
      <span>stream 8</span>
      <span class="text-uppercase q-pa-none">{{ deviceData.info.streaming.stream8 }}</span>
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
