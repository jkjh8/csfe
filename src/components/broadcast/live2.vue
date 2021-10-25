<template>
  <q-card class="card-large">
    <q-card-section class="q-pa-none">
      <div class="backg-dark">
        <div class="card-name-align">
          <div class="card-name">
            <q-icon name="svguse:icons.svg#mic" />
            <div>
              <div>
                실시간 방송
              </div>
              <div class="caption">
                방송구간은 {{ brStatus.locations }}개의 지역, {{ brStatus.zones }}개의 구역 총 {{ brStatus.broadcastZones }}개의 방송 구간이 있습니다
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-card-section>

    <q-card-sectrion>
      <!-- 방송지역선택 -->
      <div class="q-ma-md">
        <div>
          <SelectedZones
            :nodes="live.nodes"
            :selected="live.selected"
          />
        </div>
      
        <div class="q-mt-sm">
          <q-btn
            class="full-width"
            rounded
            unelevated
            color="blue-1"
            text-color="grey-10"
            @click="fnZoneSelect"
          >
            <q-icon
              name="svguse:icons.svg#map"
              size="xs"
            />
            <span class="q-ml-sm">지역선택</span>
          </q-btn>
        </div>
      </div>

      <q-separator inset />

      <!-- 방송 모드 -->
      <div class="q-ma-md">
        <div>
          <q-select
            v-model="live.mode"
            filled
            dense
            label="방송 모드"
            :options="['Media', 'TTS']"
          />
        </div>

        <div class="q-my-sm">
          <SelectedFile :file="live.file" />
        </div>

        <div
          v-if="live.mode === 'Media'"
          class="q-mt-sm"
        >
          <div>
            <q-btn
              class="full-width"
              rounded
              color="blue-1"
              text-color="grey-10"
              unelevated
              @click="fnGetFile"
            >
              <q-icon
                name="svguse:icons.svg#archive"
                size="xs"
              />
              <span class="q-ml-sm">파일선택</span>
            </q-btn>
          </div>
        </div>

        <div v-if="live.mode === 'TTS'">
          <div>
            <q-btn
              class="full-width"
              rounded
              color="teal-1"
              text-color="grey-10"
              unelevated
              @click="fnGetTtsAudio"
            >
              <q-icon
                name="svguse:icons.svg#mic"
                size="xs"
              />
              <span class="q-ml-sm">TTS 생성</span>
            </q-btn>
          </div>
        </div>
      </div>
    </q-card-sectrion>

    <q-card-section>
      <div>
        <q-btn
          class="full-width"
          rounded
          unelevated
          color="cyan-6"
        >
          <q-icon name="svguse:icons.svg#mic" />
          <span class="q-ml-sm listname">방송시작</span>
        </q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'

import zoneSelect from '@components/dialog/zoneSelect'
import fileSelect from '@components/dialog/fileSelect'
import ttsCreate from '@components/dialog/ttsCreate'

import SelectedZones from '@components/broadcast/components/selectedZones'
import SelectedFile from '@components/broadcast/components/selectedFile'

export default {
  components: { SelectedZones, SelectedFile },
  setup () {
    const { getters } = useStore()
    const $q = useQuasar()

    const brStatus = computed(() => getters['locations/locationsCount'])
    const live = ref({
      nodes: [],
      selected: [],
      mode: 'Media',
      file: null
    })
    const nodes = ref([])
    const selected = ref([])

    function fnZoneSelect() {
      $q.dialog({
        component: zoneSelect,
      }).onOk((rt) => {
        live.value.nodes = rt.zones
        live.value.selected = rt.selected
      })
    }

    function fnGetFile() {
      $q.dialog({
        component: fileSelect,
      }).onOk((rt) => {
        live.value.file = rt
      })
    }

    function fnGetTtsAudio() {
      $q.dialog({
        component: ttsCreate,
      }).onOk((rt) => {
        console.log(rt)
        live.value.file = rt
      })
    }

    return {
      live,
      nodes,
      selected,
      brStatus,
      fnZoneSelect,
      fnGetFile,
      fnGetTtsAudio,
    }
  }  
}
</script>