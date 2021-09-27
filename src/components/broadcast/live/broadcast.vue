<template>
  <q-dialog
    v-model="live"
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
          <Check />
        </div>
      </q-card-section>
      <q-card-section>
        <div>
          <div>
            <span>방송 모드: </span>
            <span>{{ mode }}</span>
          </div>
          <div>
            <span>방송 구간: </span>
            <q-tree
              :nodes="zones"
              node-key="_id"
              label-key="name"
            />
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
import { computed } from 'vue'
import { useStore } from 'vuex'
import Clock from '@components/clock'
import Check from '@components/broadcast/live/checkBroadcast'

export default {
  components: { Clock, Check },
  setup () {
    const { state, getters, commit } = useStore()
    const live = computed({
      get () { return state.broadcast.live },
      set (v) { return commit('broadcast/setLive', v) }
    })
    const mode = computed(() => state.broadcast.liveMode)
    const zones = computed(() => getters['locations/selectedGroup'])
    
    return {
      live,
      mode,
      zones
    }
  }
}
</script>
