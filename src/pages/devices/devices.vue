<template>
  <q-card
    class="q-mx-md q-my-md shadow-5"
    style="border-radius: 1rem"
  >
    <q-card-section class="q-py-sm">
      <div class="row justify-between items-center">
        <span class="row items-center">
          <q-avatar
            color="teal-14"
            text-color="white"
            size="2rem"
            icon="fas fa-play-circle"
          />
          <q-item class="q-py-none">
            <q-item-section>
              <q-item-label class="text-h6 text-bold row items-center">
                <span>디바이스</span>
                <q-spinner-puff v-if="connected" class="q-ml-sm" color="blue" />
              </q-item-label>
              <q-item-label caption>
                총 {{ count }}개의 디바이스
              </q-item-label>

            </q-item-section>
          </q-item>
        </span>
        <span class="q-mr-md">
          <q-btn flat round icon="svguse:icons.svg#pencil-fill" size="md" color="teal-6" @click="dialog=!dialog">
            <q-tooltip
              class="bg-white text-black"
              :delay="500"
            >디바이스 추가</q-tooltip>
          </q-btn>
        </span>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <Table />
    </q-card-section>
  </q-card>
  <q-dialog v-model="dialog" persistent>
    <CreateUpdate @close="dialog=false" />
  </q-dialog>
</template>

<script>
import { defineComponent, ref, computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import getUser from '../../apis/users'
import Table from '../../components/devices/table.vue'
import CreateUpdate from '../../components/devices/createUpdate.vue'

export default defineComponent({
  components: { Table, CreateUpdate },
  setup () {
    const { state, getters } = useStore()

    const count = computed(() => getters['devices/getDeviceCount'])
    const connected = computed(() => state.socket.connect)

    const dialog = ref(false)

    function addDevice () {
      dialog.value = true
    }

    onBeforeMount(() => {
      getUser()
    })

    return { count, connected, dialog, addDevice }
  }
})
</script>
