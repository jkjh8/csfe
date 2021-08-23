<template>
  <q-card
    class="q-mx-md q-my-md"
    style="border-radius: 10px"
  >
    <q-card-section>
      <div class="row justify-between items-center">
        <span class="row items-center">
          <q-avatar
            color="teal-14"
            text-color="white"
            size="36px"
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
        <span>
          <q-checkbox v-model="mode" left-label label="모드" />
        </span>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <Table />
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent, computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import getUser from '../../apis/users'
import Table from '../../components/devices/table.vue'

export default defineComponent({
  components: { Table },
  setup () {
    const store = useStore()

    const count = computed(() => store.state.barix.count)
    const connected = computed(() => store.state.socket.connect)
    const mode = computed({
      get () { return store.state.barix.mode },
      set (value) { return store.commit('barix/changeMode', value) }
    })

    onBeforeMount(() => {
      getUser()
    })

    return { count, connected, mode }
  }
})
</script>
