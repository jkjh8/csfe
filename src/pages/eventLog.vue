<template>
  <q-card
    class="q-mx-md q-my-md"
    style="border-radius: 10px;"
  >
    <q-card-section>
      <div class="row items-center">
        <span>
          <q-avatar
            color="green-10"
            text-color="white"
            size="36px"
            icon="fas fa-list"
          ></q-avatar>
        </span>
        <span class="text-h6 text-bold q-ml-sm">
          이벤트 로그
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
import { defineComponent, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
// import { api } from '../boot/axios'
import getUser from '../apis/users'

import Table from '../components/eventlog/logTable.vue'

export default defineComponent({
  components: { Table },
  setup () {
    const store = useStore()
    const eventlog = computed(() => store.state.eventlog.logs)
    onMounted(() => {
      getUser()
      // api.get('/eventlog').then((res) => {
      //   console.log(res)
      //   store.dispatch('eventlog/updateLogs', res.data)
      // })
    })

    return { eventlog }
  }
})
</script>
