<template>
  <!-- 에러 표시창 -->
  <div v-if="error">
    <div style="position: relative; height: 3rem;">
      <div
        class="bg-red text-white row justify-end"
        style="position: absolute; border-radius: 1.5rem; width:100%; height: 3rem;"
      >
        <q-btn
          style="z-index: 10;"
          round
          flat
          icon="cancel"
          @click="error=null"
        />
      </div>
      <div
        style="position: absolute; width:100%; text-align: center; color: white; line-height: 3rem;"
      >
        {{ error }}
      </div>
    </div>
  </div>

  <!-- 내용 시작 -->
  <!-- voice -->
  <div>
    <q-select
      v-model="ttsMsg.voice"
      :options="voices"
      option-label="name"
      :display-value="ttsMsg.voice ? `${ttsMsg.voice.name} - ${ttsMsg.voice.languages}`: 'None'"
      emit-value
      map-options
      filled
      dense
      label="Voices"
    >
      <template #option="scope">
        <q-item v-bind="scope.itemProps">
          <q-item-section avatar>
            <q-icon
              name="mic"
              color="green"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              {{ scope.opt.name }}
            </q-item-label>
            <q-item-label caption>
              {{ scope.opt.languages.toString(',') }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>

  <!-- rate -->
  <div class="text-grey row nowrap justify-between items-center">
    <div>
      Rate
    </div>
    <q-slider
      v-model="ttsMsg.rate"
      style="width: 90%"
      label
      :min="100"
      :max="300"
    />
  </div>
  <!-- text -->
  <div>
    <q-input
      v-model="ttsMsg.text"
      label="Text"
      filled
      type="textarea"
    />
  </div>

  <!-- buttons -->
  <div class="row q-mt-xs q-gutter-md">
    <q-btn
      style="width: 6rem; height: 2rem;"
      rounded
      flat
      @click="ttsPreview"
    >
      미리듣기
    </q-btn>
    <q-btn
      style="width: 6rem; height: 2rem;"
      rounded
      unelevated
      color="primary"
      @click="mdMessage=!mdMessage"
    >
      메시지관리
    </q-btn>
    <q-btn
      style="width: 6rem; height: 2rem;"
      rounded
      unelevated
      color="primary"
      @click="mdMessage=!mdMessage"
    >
      저장하기
    </q-btn>
  </div>
</template>

<script>
import { ref, computed, toRefs, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'

export default {
  props: { id: String },
  emits: ['close', 'update'],
  setup(props, { emit }) {
    const { state, dispatch } = useStore()
    const $q = useQuasar()
    const { id } = toRefs(props)

    const error = ref('')
    const user = computed(() => state.user.user)
    const voices = computed(() => state.broadcast.ttsVoices)

    const ttsMsg = ref({
      voice: null,
      name: '',
      rate: 200,
      text: ''
    })

    function onSubmit() {
      console.log(id)
      emit('update')
    }

    onMounted(async () => {
      $q.loading.show()
      await dispatch('broadcast/getTtsInfo')
      $q.loading.hide()
    })

    return {
      error,
      user,
      voices,
      ttsMsg,
      onSubmit
    }
  }
}
</script>