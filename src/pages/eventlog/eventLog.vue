<template>
  <div style="padding: 5% 5% 0 5%;">
    <div class="row justify-between items-center q-ml-md">
      <div class="row items-center q-gutter-sm">
        <q-icon name="svguse:icons.svg#collection" size="sm" color="cyan" />
        <span class="name">
          이벤트 로그
        </span>
        <span class="caption">
          총 {{ logs.totalDocs }}개의 이벤트로그가 있습니다.
        </span>
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
    </div>
    <q-card-section>
      <Table />
    </q-card-section>
  </div>
</template>

<script setup>
import { getCurrentInstance, onBeforeMount, computed } from 'vue'
import Table from '../../components/eventlog/table.vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const { proxy } = getCurrentInstance()
const logs = computed(() => proxy.$store.state.eventlog.logs)

const search = computed({
  get () { return proxy.$store.state.eventlog.search },
  set (value) { return proxy.$store.commit('eventlog/updateSearch', value) }
})

async function getLogWithSearch () {
  $q.loading.show({ spinnerColor: 'primary' })
  await proxy.$store.dispatch('eventlog/getLogs')
  $q.loading.hide()
}
onBeforeMount(() => {
  proxy.$store.dispatch('user/getUser')
})
</script>

<style scoped>
.name {
  font-family: 나눔고딕;
  font-weight: 700;
  font-size: 1.2rem;
}
.caption {
  font-family: 나눔고딕;
  font-weight: 400;
  font-size: .5rem;
}
</style>
