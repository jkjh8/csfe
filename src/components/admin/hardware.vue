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
    
    <q-card-section>
      <div class="q-gutter-md q-mx-sm">
        <div class="row justify-between items-center">
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

        <div class="row justify-between items-center">
          <div>서버 리부팅</div>
          <q-btn
            round
            unelevated
            size="sm"
            color="primary"
            icon="arrow_forward"
            @click="reboot"
          />
        </div>
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
import { useQuasar, format } from 'quasar'
import { api } from '@/boot/axios'
import secToDays from '@api/secToDays'

import Delete from '@components/dialog/delete'

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
        component: Delete,
        componentProps: { message: '임시 파일을 삭제하여 추가 디스크 공간을 확보합니다.'}
      }).onOk(async () => {
        console.log('OK')
        try {
          await api.get('/admin/removeTmp')
          await api.post('/eventlog', {
            source: user.value.email,
            message: '임시 폴더를 삭제 했습니다.'
          })
        } catch (err) {
          await api.post('/eventlog', {
            source: user.value.email,
            category: 'warning',
            priority: 'mid',
            message: '임시 폴더를 삭제시 문제가 발생 했습니다.'
          })
          console.error(err)
        }
      })
    }

    async function reboot () {
      $q.dialog({
        title: '<svg class="text-red" style="height: 32px; width: 32px; margin: 0px 10px -12px 0;"><use xlink:href="icons.svg#exclamation"></use></svg><span>서버 리부팅</span>',
        message: '서버를 리부팅 합니다.',
        html: true,
        cancel: true,
        persistent: true
      }).onOk(async () => {
        try {
          await api.get('/admin/reboot')
          await api.post('/eventlog', {
            source: user.value.email,
            message: '서버를 리부팅 합니다.'
          })
        } catch (err) {
          await api.post('/eventlog', {
            source: user.value.email,
            message: `서버 리부팅 동작시 에러가 발생하였습니다. ${err.message}`
          })
        }
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
      deleteTmp,
      reboot
    }
  }
}
</script>

<style scoped>
.link {
  text-decoration: none;
}
</style>
