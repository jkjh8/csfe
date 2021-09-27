<template>
  <div style="padding: 5% 5% 0 5%;">
    <div class="row justify-between items-center q-ml-lg q-mb-lg">
      <div class="row items-center q-gutter-sm">
        <q-icon
          name="svguse:icons.svg#collection"
          size="sm"
          color="cyan"
        />
        <span class="name">
          이벤트 로그
        </span>
        <span class="caption">
          총 {{ logs.totalDocs }}개의 이벤트로그가 있습니다.
        </span>
      </div>
      <div class="q-mr-sm row items-center">
        <q-input
          v-model="search"
          rounded
          outlined
          dense
          hide-bottom-space
          placeholder="검색"
          input-style="margin-left: 10px;"
          @keyup.enter="getLogWithSearch"
        >
          <template #append>
            <q-btn
              round
              flat
              size="xs"
              icon="fas fa-search"
              @click="getLogWithSearch"
            />
          </template>
        </q-input>
        <span class="q-ml-sm q-pa-none">
          <q-btn
            round
            flat
            @click="getLogWithSearch"
          >
            <q-icon
              name="sync"
              size="1.5rem"
            />
          </q-btn>
        </span>
      </div>
    </div>
    <Table />
  </div>
</template>

<script>
import { onBeforeMount, computed } from 'vue'
import { useQuasar } from 'quasar'
import { useStore } from 'vuex'
import Table from '../../components/eventlog/table.vue'

export default {
  components: { Table },
  setup () {
    const $q = useQuasar()
    const { state, commit, dispatch } = useStore()
    const logs = computed(() => state.eventlog.logs)
    const search = computed({
      get () { return state.eventlog.search },
      set (value) { return commit('eventlog/updateSearch', value) }
    })
    async function getLogWithSearch () {
      $q.loading.show({ spinnerColor: 'primary' })
      await dispatch('eventlog/getLogs')
      $q.loading.hide()
    }
    onBeforeMount(() => {
      dispatch('user/getUser')
    })
    return {
      logs,
      search,
      getLogWithSearch
    }
  }
}
</script>
