<template>
  <!-- notice dialogRef here -->
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
  >
    <q-card
      class="q-dialog-plugin"
      style="width: 800px; max-width: 1500px"
    >
      <!--
        ...content
        ... use q-card-section for it?
      -->
      <q-card-section class="bg-grey-1">
        <div class="row items-center q-gutter-md">
          <q-avatar
            color="orange-1"
            size="2.5rem"
          >
            <q-icon
              name="svguse:icons.svg#mic"
              color="orange"
              size="1.5rem"
            />
          </q-avatar>
          <div>
            <div style="font-size: 1.2rem;">
              TTS 생성
            </div>
            <div class="caption">
              TTS를 이용하여 오디오파일을 생성합니다.
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="row">
          <div class="col-6">
            <!-- 이름 -->
            <div class="row items-center q-pa-sm">
              <q-icon
                name="svguse:icons.svg#setup"
                size="sm"
              />
              <div class="listname q-ml-sm">
                저장된 메시지
              </div>
            </div>
            <!-- 내용 -->
            <div>
              <q-scroll-area style="height: 320px;">
                <q-list>
                  <q-item
                    v-for="preset in presets"
                    :key="preset._id"
                    v-ripple
                    class="q-pa-sm"
                    dense
                    clickable
                    active-class="active-class"
                    :active="preset === selected"
                    @click="fnClick(preset)"
                  >
                    <q-item-section avatar>
                      <q-avatar
                        color="yellow-2"
                        size="1.8rem"
                      >
                        <q-icon
                          name="list_alt"
                          size="1rem"
                          color="orange"
                        />
                      </q-avatar>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>
                        {{ preset.name }}
                      </q-item-label>
                      <q-item-label caption>
                        {{ preset.type }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-scroll-area>
            </div>
          </div>

          <div class="col-6">
            <!-- 이름 -->
            <div class="row items-center q-pa-sm">
              <q-icon
                name="svguse:icons.svg#mic-color"
                size="sm"
              />
              <div class="listname q-ml-sm">
                TTS
              </div>
            </div>
            
            <!-- 내용 -->
            <div class="q-mx-md q-gutter-sm">
              <div
                v-if="error"
                class="errorMsg"
              >
                {{ error }}
              </div>

              <div>
                <q-input
                  v-model="tts.name"
                  dense
                  filled
                  label="이름"
                />
              </div>
              <div>
                <q-select
                  v-model="tts.voice"
                  dense
                  :options="voices"
                  filled
                  label="음성선택"
                  option-label="name"
                  :display-value="tts.voice ? `${tts.voice.name} - ${tts.voice.languages}`: 'None'"
                  emit-value
                  map-options
                >
                  <template #option="scope">
                    <q-item v-bind="scope.itemProps">
                      <q-item-section avatar>
                        <q-icon
                          name="svguse:icons.svg#mic-color"
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

              <div class="q-mt-sm q-mx-sm row justify-between items-center">
                <div class="text-grey">
                  Rate
                </div>
                <q-slider
                  v-model="tts.rate"
                  style="width: 90%;"
                  label
                  :min="100"
                  :max="300"
                />
              </div>

              <div>
                <q-input
                  v-model="tts.text"
                  filled
                  type="textarea"
                  label="메시지"
                />
              </div>
            </div>

            <div class="q-mx-md q-gutter-sm q-mt-md row justify-between">
              <q-btn
                rounded
                unelevated
                color="grey-3"
                text-color="grey-10"
                @click="fnPreview"
              >
                <q-icon
                  name="svguse:icons.svg#mic-color"
                  size="sm"
                />
                <span class="q-ml-sm">미리듣기</span>
              </q-btn>

              <q-btn
                rounded
                unelevated
                color="cyan-1"
                text-color="grey-10"
              >
                <q-icon
                  name="svguse:icons.svg#save-color"
                  size="sm"
                />
                <span class="q-ml-sm">저장하기</span>
              </q-btn>
            </div>
          </div>
        </div>
      </q-card-section>

      <!-- buttons example -->
      <q-card-actions align="right">
        <div class="q-mx-sm q-gutter-sm">
          <q-btn
            label="취소"
            rounded
            unelevated
            @click="onCancelClick"
          />
          <q-btn
            :disabled="!tts.file"
            color="primary"
            label="확인"
            unelevated
            rounded
            @click="onOKClick(schedule)"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useQuasar, useDialogPluginComponent } from 'quasar'
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { api } from '@/boot/axios'

export default {
  props: {
    item: Object
  },

  emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits
  ],

  setup (props) {
    // REQUIRED; must be called inside of setup()
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
    const { state, dispatch } = useStore()
    const $q = useQuasar()

    const error = ref('')
    const user = computed(() => state.user.user)
    const voices = computed(() => state.broadcast.ttsVoices)
    const tts = ref({
      name: '',
      voice: null,
      rate: 200,
      text: '',
      file: null,
    })
    const presets = ref([])
    const selected = ref(null)

    function fnClick (item) {
      selected.value = item
      tts.value = { ...item }
      console.log(tts.value)
    }

    async function fnPreview () {
      error.value = ''
      if (!tts.value.voice) return error.value = '음성을 선택해주세요.'
      if (!tts.value.text) return error.value = '메시지를 입력해주세요.'
      const r = await api.post('/broadcast/tts/preview', tts.value)
      console.log(r)
      dispatch('broadcast/startPreview',{
        nameTag: 'TTS Preview',
        name: r.data.src,
        fsrc: r.data.file,
        base: 'temp',
        type: 'audio'
      })

    }

    onMounted(async () => {
      $q.loading.show();
      tts.value.name = props.item.id
      dispatch('broadcast/getTtsInfo')
      try {
        const r = await api.get(`/broadcast/tts/list?user_id=${user.value.email}`)
        presets.value = r.data
      } catch (err) {
        console.error(err)
      }
      $q.loading.hide();
    })

    return {
      // This is REQUIRED;
      // Need to inject these (from useDialogPluginComponent() call)
      // into the vue scope for the vue html template
      dialogRef,
      onDialogHide,
      error,
      tts,
      voices,
      presets,
      selected,
      fnClick,
      fnPreview,

      // other methods that we used in our vue html template;
      // these are part of our example (so not required)
      onOKClick (item) {
        // on OK, it is REQUIRED to
        // call onDialogOK (with optional payload)
        onDialogOK(item)
        // or with payload: onDialogOK({ ... })
        // ...and it will also hide the dialog automatically
      },

      // we can passthrough onDialogCancel directly
      onCancelClick: onDialogCancel
    }
  }
}
</script>

<style scoped>
.active-class {
  background: #91ECEC;
  color: #000;
  border-radius: .5rem;
}
</style>