<template>
  <q-card class="shadow-15 location_card" style="width: 24rem;">
    <q-card-section class="q-pa-none">
      <q-img
        src="/background/cover_1.png" style="height:6rem;"
      >
        <div class="q-ml-sm fit row items-center text-white">
          <q-icon name="svguse:icons.svg#view-list" size="1.5rem" />
          <div class="q-ml-md name">실시간 방송</div>
        </div>
      </q-img>
    </q-card-section>
    <q-card-section>
      <q-scroll-area style="height: 24rem;">
        <div class="q-px-md q-gutter-md">
          <!-- mode 선택 -->
          <div class="q-gutter-sm">
            <div class="listname">Mode</div>
            <q-select
              v-model="mode"
              outlined
              rounded
              dense
              :options="['Live', 'TTS', 'Play Audio']"
            />
          </div>
          <!-- 라이브 -->
          <div
            v-if="mode === 'Live'"
            class="q-gutter-sm"
          >
            <div class="listname">방송채널선택</div>
            <q-select
              v-model="liveChannel"
              outlined rounded dense
              :options="[1, 2, 3, 4]"
            />
          </div>
          <!-- TTS -->
          <div
            v-if="mode === 'TTS'"
            class="q-gutter-sm"
          >
            <div class="listname">TEXT</div>
            <q-input
              v-model="ttsText"
              class="bg-grey-2"
              type="textarea"
            />
            <div class="row justify-between q-mt-md">
              <q-btn rounded unelevated color="yellow-10">미리듣기</q-btn>
              <q-btn rounded unelevated color="primary">메세지관리</q-btn>
            </div>
          </div>
          <!-- play audio file -->
          <div
            v-if="mode === 'Play Audio'"
            class="q-gutter-sm"
          >
            <div class="listname"></div>
            <div class="row justify-center items-center q-mt-md">
              <q-btn class="full-width"
                rounded unelevated color="primary">파일선택</q-btn>
            </div>
          </div>
        </div>
      </q-scroll-area>
    </q-card-section>
    <q-separator />
    <q-card-actions align="center">
      <div class="fit row justify-center items-center" style="height: 4rem;">
        <q-btn
          style="width: 20rem; height:2rem; margin: 5px 0;"
          rounded
          color="primary"
          label="방송시작"
        ></q-btn>
      </div>
    </q-card-actions>
  </q-card>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
// import { api } from '@api/axios'

export default {
  setup () {
    const { state, getters } = useStore()
    const selected = computed(() => state.locations.selectedId)
    const group = computed(() => getters['locations/selectedGroup'])

    const mode = ref('Live')
    const liveChannel = ref(1)
    const ttsText = ref('')
    const playAudioFile = ref('')

    return {
      selected,
      group,
      mode,
      liveChannel,
      ttsText,
      playAudioFile
    }
  }
}
</script>

<style>
.q-textarea .q-field__native {
  padding: 5px 5px !important;
}
</style>
