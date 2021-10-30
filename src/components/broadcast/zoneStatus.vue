<template>
  <q-card
    flat
    style="width: 11rem; border: solid 1px #eee; border-radius: 1rem"
  >
    <q-card-section
      :class="device.active[item.channel - 1] ? 'bg-yellow' : 'bg-blue-grey-1'"
    >
      <div class="fit row justify-between">
        <div class="row no-wrap q-gutter-md q-pr-sm items-center">
          <q-avatar
            class="avatar"
            size="1.5rem"
          >
            <q-icon
              name="svguse:icons.svg#server"
              size="md"
            />
            <q-badge
              v-if="!item.status"
              floating
              rounded
              color="red"
            />
          </q-avatar>
          <div class="statusName">
            {{ item.label }}
          </div>
        </div>
        <div>
          <q-btn
            round
            size="sm"
            flat
            icon="svguse:icons.svg#cog"
          >
            <q-popup-proxy>
              <q-card>
                <q-card-section class="bg-grey-1">
                  <span>{{ item.label }}</span>
                </q-card-section>

                <q-card-section>
                  <div>
                    <div>
                      <a
                        :href="`http://${item.ipaddress}`"
                        target="_blank"
                      >
                        {{ item.ipaddress }}
                      </a>
                    </div>
                    <!-- <div class="fit row justify-between">
                      <span>Device</span>
                      <span>{{ zone.devicetype }}</span>
                    </div>

                    <div class="fit row justify-between">
                      <span>Mode</span>
                      <span>{{ zone.mode }}</span>
                    </div> -->

                    <div class="fit row justify-between">
                      <span>방송채널</span>
                      <span>{{ item.channel }}</span>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </q-popup-proxy>
          </q-btn>
        </div>
      </div>
    </q-card-section>

    <q-card-section>
      <div class="q-gutter-sm">
        <div class="row no-wrap justify-between">
          <span>동작상태</span>
          <span>{{ device.active[item.channel - 1] ? '방송중' : '대기중' }}</span>
        </div>

        <div class="row no-wrap justify-between">
          <span class="statustext">방송채널</span>
          <span>{{ item.channel }}</span>
        </div>
        
        <div class="fit row no-wrap justify-between items-center">
          <span class="statustext">Volume</span>
          <span v-if="device && device.gain">
            {{ device.gain[item.channel - 1] }}dB
          </span>
        </div>

        <div class="fit row no-wrap justify-between items-center">
          <span class="statustext">Mute</span>
          <span>
            <q-btn
              v-if="device && device.mute"
              label="mute"
              size="xs"
              rounded
              unelevated
              :color="device.mute[item.channel - 1]? 'red':'cyan'"
            />
          </span>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { onMounted } from 'vue'
// import { useStore } from 'vuex'

export default {
  props: {
    device: Object,
    item: Object
  },
  setup() {
    // const vol = computed(() => {
    //   return props.devices.gain[one.channel - 1]
    // })
    onMounted(() => {
      // if (props.location && props.location.length) {
      //   active.value = location.value.active
      // } else {
      //   active.value = null
      // }
    })

    // function getActive(id) {
    //   try {
    //     if (props.location && props.location.length) {
    //       console.log(props.location)
    //       return location.value.active[id - 1]
    //     } else {
    //       return false
    //     }
    //   } catch {
    //     return false
    //   }
    // }
    return {
      // vol
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
