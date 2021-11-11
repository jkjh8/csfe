<template>
  <q-dialog
    v-model="mdLive"
    maximized
    transition-hide="slide-down"
    transition-show="slide-up"
  >
    <q-card
      class="bg-blue-10"
    >
      <q-bar>
        <q-space />
        <q-btn
          v-close-popup
          dense
          flat
          icon="close"
        >
          <q-tooltip class="bg-white text-primary">
            Close
          </q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section>
        <div class="q-pa-md row justify-center">
          <div class="text-white">
            <div class="text-h6 text-grey">
              현재 시간은
            </div>
            <div class="text-h4">
              {{ clock.date }}
            </div>
            <div>
              <span class="text-h1">{{ clock.time }}</span>
              <span class="text-h6">{{ clock.weekday }}</span>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="row">
          <div class="col-6">
            <div style="margin: 5% 5% 5% 40%;">
              <SelectedZones
                :nodes="live.nodes"
                :selected="live.selected"
                :height="200"
              />
            </div>
          </div>
          <div class="col-6">
            <div style="margin: 5% 40% 5% 5%">
              <SelectedFile :file="live.file" />
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="row justify-center items-center">
          <div
            class="row justify-between"
            style="width: 30%"
          >
            <q-btn
              v-close-popup
              style="width: 12rem; height: 8rem;"
              flat
              rounded
            >
              <span class="text-grey-5 text-h6">
                닫기
              </span>
            </q-btn>
            <q-btn
              style="width: 12rem; height: 8rem;"
              unelevated
              rounded
              color="primary"
              @click="fnStart"
            >
              <span class="text-h6 text-white">
                방송 시작
              </span>
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog
    v-model="onair"
    persistent
  >
    <q-spinner
      class="spinner"
      color="blue-10"
      size="50%"
      :thickness="10"
    />
    <div class="fixed-center text-h1 text-bold text-white q-pa-md shadow-0">
      {{ counter }}
    </div>
    <div class="cancelBtn">
      <q-btn
        v-close-popup
        style="width: 12rem; height: 6rem; font-size: 2rem;"
        color="white"
        text-color="black"
        label="취소"
        @click="fnCancel"
      />
    </div>
  </q-dialog>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import moment from 'moment'
moment.locale('ko')

import { socket } from '@/boot/socketio'

import SelectedZones from '@components/broadcast/components/selectedZones'
import SelectedFile from '@components/broadcast/components/selectedFile'

export default {
  components: { SelectedZones, SelectedFile },
  setup () {
    const { state, commit } = useStore()
    const mdLive = computed({
      get () { return state.broadcast.mdLive },
      set (v) { 
        if (!v) {
          socket.disconnect()
          clearInterval(clockTimer.value)
        }
        return commit('broadcast/setMdLive', v)
      }
    })
    const live = computed(() => state.broadcast.live)
    const onair = ref(false)
    const clock = ref('')
    const clockTimer = ref(null)
    const counter = ref(0)
    const channels = ref([])

    function updatClock () {
      const time = moment()
      clock.value = { date: time.format('YYYY-MM-DD'), time: time.format('hh:mm:ss'), weekday: time.format('a') }
    }

    function fnStart () {
      onair.value = true
      channels.value = []
      console.log(live.value)
      live.value.nodes.forEach(locate => {
        channels.value.push({
          name: live.value.name,
          ipaddress: locate.ipaddress,
          channels: locate.children.map(e => e.channel)
        })
      })
      socket.emit('broadcastStart', {
        ...live.value,
        channels: channels.value
      })
    }
    function fnCancel () {
      counter.value = 0
      socket.emit('broadcastEnd', {
        ...live.value,
        channels: channels.value
      })
    }

    onMounted(() => {
      updatClock()
      clockTimer.value = setInterval(() => updatClock(), 1000)
      console.log('live', live.value)
      socket.on('multicast', (data) => {
        if (data.command && data.command === 'end') {
          console.log('end')
          counter.value = 0
          onair.value = false
          fnCancel()
        }
        if (data.currentTime) {
          counter.value = data.currentTime
        }
      })
      socket.on('broadcast', (data) => {
        console.log(data)
      })
    })
    
    onBeforeUnmount(() => {
      socket.disconnect()
      clearInterval(clockTimer.value)
    })

    return {
      live,
      mdLive,
      clock,
      fnStart,
      onair,
      counter,
      fnCancel
    }
  }
}
</script>

<style scoped>
.spinner {
  position: fixed;
}
.cancelBtn {
  position: fixed;
  top: 80%;
}
</style>