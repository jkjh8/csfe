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
        <div class="row justify-center">
          <Clock />
          <Check class="q-ml-lg" />
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
              style="width: 9rem; height: 5rem;"
              flat
              rounded
            >
              <span class="text-grey-5 text-h6">
                취소
              </span>
            </q-btn>
            <q-btn
              style="width: 9rem; height: 5rem;"
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
</template>

<script>
import { computed, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'

import { socket } from '@/boot/socketio'

import Clock from '@components/widgets/clock'
import Check from '@components/broadcast/live/checkBroadcast'

export default {
  components: { Clock, Check },
  setup () {
    const { state, commit } = useStore()
    const mdLive = computed({
      get () { return state.broadcast.mdLive },
      set (v) { 
        if (!v) {
          socket.disconnect()
        }
        return commit('broadcast/setMdLive', v)
      }
    })
    const live = computed(() => state.broadcast.live)

    function fnStart () {
      const channels = []
      console.log(live.value)
      live.value.nodes.forEach(locate => {
        channels.push({
          ipaddress: locate.ipaddress,
          channels: locate.children.map(e => e.channel)
        })
      })
      socket.emit('broadcastStart', {
        ...live.value,
        channels
      })
    }

    onMounted(() => {
      console.log('live', live.value)
    })
    
    onBeforeUnmount(() => {
      socket.disconnect()
    })

    return {
      live,
      mdLive,
      fnStart
    }
  }
}
</script>
