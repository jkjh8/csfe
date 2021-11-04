<template>
  <!-- notice dialogRef here -->
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
  >
    <q-card class="q-dialog-plugin">
      <!--
        ...content
        ... use q-card-section for it?
      -->
      <q-card-section class="bg-grey-1">
        <div class="listname">
          프리셋 수정
        </div>
      </q-card-section>

      <q-card-section
        v-if="error"
        class="q-pb-none"
      >
        <div class="errorMsg q-mx-sm">
          {{ error }}
        </div>
      </q-card-section>

      <q-card-section class="q-pa-lg">
        <div class="q-mt-md q-gutter-md">
          <div v-if="user.admin">
            <q-select
              v-model="preset.type"
              :options="['Global', 'Private']"
              filled
              dense
              label="Preset Mode"
            />
          </div>
          <div>
            <q-input
              v-model="preset.name"
              filled
              dense
              label="Name"
            />
          </div>
          <q-separator />
          <div>
            <q-select
              v-model="preset.voice"
              dense
              :options="voices"
              filled
              label="음성선택"
              option-label="name"
              :display-value="preset.voice ? `${preset.voice.name} - ${preset.voice.languages}`: 'None'"
              emit-value
              map-options
            >
              <template #option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section avatar>
                    <q-icon
                      name="svguse:iconsColor.svg#mic-color"
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
              v-model="preset.rate"
              style="width: 90%;"
              label
              :min="100"
              :max="300"
            />
          </div>

          <div>
            <q-input
              v-model="preset.text"
              filled
              type="textarea"
              label="메시지"
            />
          </div>
        </div>
      </q-card-section>

      <!-- buttons example -->
      <q-card-actions
        class="bg-grey-1"
        align="right"
      >
        <div class="q-mx-sm q-gutter-sm">
          <q-btn
            label="취소"
            rounded
            unelevated
            @click="onCancelClick"
          />
          <q-btn
            color="primary"
            label="확인"
            unelevated
            rounded
            @click="onOKClick()"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent } from 'quasar'
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

// import { api } from '@/boot/axios'

export default {
  props: {
    item: Object
  },

  emits: [
    ...useDialogPluginComponent.emits
  ],

  setup(props) {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
    const { state } = useStore()
    const error = ref('')
    // const $q = useQuasar()

    const user = computed(() => state.user.user)
    const voices = computed(() => state.broadcast.ttsVoices)
    const preset = ref({
      name: '',
      type: 'Private',
      rate: 200,
      text: '',
      voice: null
    })

    onMounted(() => {
      preset.value = { ...props.item, type: 'Private', user_id: user.value.email }
      console.log(preset.value)
    })

    function onOKClick () {
      if (!preset.value.name) return error.value = '이름을 입력하세요.'
      if (!preset.value.voice) return error.value = '음성을 선택해 주세요.'
      if (!preset.value.text) return error.value = '메시지를 입력해 주세요.'
      onDialogOK(preset.value)
    }

    return {
      error,
      user,
      voices,
      preset,
      dialogRef,
      onDialogHide,
      onOKClick,
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
