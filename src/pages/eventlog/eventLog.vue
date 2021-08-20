<template>
  <q-card
    class="q-mx-md q-my-md"
    style="border-radius: 1rem;"
  >
    <q-card-section class="q-py-sm row justify-between items-center">
      <div class="row items-center">
        <span>
          <q-avatar
            color="green-10"
            text-color="white"
            size="2rem"
            icon="fas fa-list"
          ></q-avatar>
        </span>
        <q-item class="q-py-none">
          <q-item-section>
            <q-item-label class="text-h6 text-bold nanum">
              이벤트 로그
            </q-item-label>
            <q-item-label caption>
              총 {{ count }}개의 이벤트로그
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
      <div class="q-mr-sm row items-center">
        <q-input
          rounded outlined dense hide-bottom-space
          placeholder="검색"
          v-model="search"
          input-style="margin-left: 10px;"
          @keyup.enter="getLogWithSearch"
        >
          <template v-slot:append>
            <q-btn
              round flat
              size="xs"
              icon="fas fa-search"
              @click="getLogWithSearch"
            >
            </q-btn>
          </template>
        </q-input>
        <span class="q-ml-sm q-pa-none">
          <q-btn
            round flat
            @click="getLogWithSearch"
          >
            <q-icon name="sync" size="1.5rem" />
          </q-btn>
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
import { defineComponent, onBeforeMount, computed } from 'vue'
import { useStore } from 'vuex'
import getLog from '../../apis/getLog'

import Table from '../../components/eventlog/logTable.vue'

export default defineComponent({
  components: { Table },
  setup () {
    const store = useStore()
    const count = computed(() => store.state.eventlog.count)
    const search = computed({
      get () { return store.state.eventlog.search },
      set (value) { return store.commit('eventlog/updateSearch', value) }
    })

    async function getLogWithSearch () {
      store.commit('eventlog/updateLoading', true)
      const r = await getLog(store.state.eventlog.rowsPerPage, store.state.eventlog.page, search.value)
      store.dispatch('eventlog/updateLogs', r)
      store.commit('eventlog/updateLoading', false)
    }
    onBeforeMount(() => {
      store.dispatch('user/getUser')
    })

    return { count, search, getLogWithSearch }
  }
})
</script>

<style scoped>
.nanum {
  font-family: 'nanumgothicbold';
}
</style>
