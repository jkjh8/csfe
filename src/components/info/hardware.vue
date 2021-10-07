<template>
  <q-card class="card-small">
    <q-card-section>
      <div class="row items-center">
        <q-icon
          name="storage"
          size="md"
          color="green-8"
        />
        <div
          class="listname q-ml-sm q-pb-sm"
          style="font-size: 1.1rem;"
        >
          하드웨어
        </div>
      </div>
    </q-card-section>

    <q-card-section>
      <div class="text-grey-8 q-px-md q-mb-md">
        <div>
          현재 하드웨어는 부팅후 {{ uptime }} 경과 되었습니다.
        </div>
        <div class="q-mt-md">
          <div>
            <div class="listname">
              메모리
            </div>
            <div class="row justify-between">
              <div>{{ usemem }}</div>
              <div>{{ totalmem }}</div>
            </div>
            <div>
              <q-linear-progress :value="useagemem" />
            </div>
          </div>
          <div class="q-mt-md">
            <div class="listname">
              저장장치
            </div>
            <div class="row justify-between">
              <div>{{ usedisk }}</div>
              <div>{{ totaldisk }}</div>
            </div>
            <div>
              <q-linear-progress :value="useagedisk" />
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
    
    <q-card-section v-if="user.admin">
      <div class="q-mx-md row justify-between items-center">
        <div>tmp 폴더 비우기</div>
        <q-btn
          round
          unelevated
          size="sm"
          color="primary"
          icon="arrow_forward"
          @click="deleteTmp"
        />
      </div>
    </q-card-section>

    <!-- <q-card-section>
      <div class="fit row q-px-md q-pb-md">
        <q-space />
        <router-link
          class="link row items-center"
          to="/locations"
        >
          <span>방송구간설정 바로가기</span>
          <q-icon name="arrow_forward" />
        </router-link>
      </div>
    </q-card-section> -->
  </q-card>
</template>

<script>
import { ref, computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'
import { api } from '@/boot/axios'
import { format } from 'quasar'
import secToDays from '@api/secToDays'

export default {
  setup() {
    const { state } = useStore()
    const $q = useQuasar()

    const user = computed(() => state.user.user)
    const info = ref({})
    const totalmem = ref('')
    const usemem = ref('')
    const useagemem = ref(0)

    const totaldisk = ref('')
    const usedisk = ref('')
    const useagedisk = ref(0)

    const uptime = ref('')

    async function deleteTmp () {
      $q.dialog({
        title: 'Tmp 폴더 비우기',
        message: 'tmp 폴더를 비워서 추가 SSD 용량을 확보합니다.'
      })
    }

    onBeforeMount(async () => {
      const r = await api.get('/hardware')
      info.value = r.data
      totalmem.value = format.humanStorageSize(r.data.totalmem)
      usemem.value = format.humanStorageSize(r.data.totalmem - r.data.freemem)
      useagemem.value = (r.data.totalmem - r.data.freemem) / r.data.totalmem

      totaldisk.value = format.humanStorageSize(r.data.totaldisk)
      usedisk.value = format.humanStorageSize(r.data.totaldisk - r.data.freedisk)
      useagedisk.value = (r.data.totaldisk - r.data.freedisk) / r.data.totaldisk

      uptime.value = secToDays(r.data.uptime)
    })

    return {
      user,
      info,
      useagemem,
      totalmem,
      usemem,
      totaldisk,
      usedisk,
      useagedisk,
      uptime,
      deleteTmp
    }
  }
}
</script>

<style scoped>
.link {
  text-decoration: none;
}
</style>