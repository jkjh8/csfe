<template>
  <!-- notice dialogRef here -->
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
  >
    <q-card class="q-dialog-plugin">
      <q-card-section class="bg-grey-1">
        <div class="row items-center q-gutter-md">
          <q-avatar
            color="red-1"
            text-color="red"
            size="2.5rem"
          >
            <q-icon
              name="svguse:iconsColor.svg#map1"
              color="orange"
              size="1.5rem"
            />
          </q-avatar>
          <div>
            <div style="font-size: 1.2rem">
              방송구간 프리셋
            </div>
            <div>방송구간을 추가 또는 수정합니다.</div>
          </div>
        </div>
      </q-card-section>

      <!-- 에러 메세지 표시창 -->
      <q-card-section v-if="error">
        <div class="text-red text-center">
          {{ error }}
        </div>
      </q-card-section>

      <q-card-section>
        <div class="q-ma-md q-gutter-sm">
          <q-select
            v-if="user.admin"
            v-model="preset.type"
            filled
            dense
            label="모드선택"
            :options="['Global', 'Private']"
          />
          <q-input
            v-model="preset.name"
            filled
            dense
            label="프리셋 이름"
          />
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          label="취소"
          rounded
          flat
          @click="onCancelClick"
        />
        <q-btn
          color="primary"
          rounded
          unelevated
          label="확인"
          @click="onOKClick"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent } from 'quasar'
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  props: {
    item: Object,
    selected: Array
  },

  emits: [
    ...useDialogPluginComponent.emits
  ],

  setup (props) {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
    const { state } = useStore()
    const user = computed(() => state.user.user)

    const error = ref('')
    const preset = ref({
      name: '',
      type: 'Private',
      zones: []
    })

    function onOKClick() {
      if (!preset.value.zones) {
        return error.value = '방송구간을 먼저 선택하세요!'
      }
      if (!preset.value.name) {
        return error.value = '프리셋 이름을 입력하세요.'
      }
      console.log(preset.value)
      onDialogOK(preset.value)
    }

    onMounted(() => {
      preset.value = { ...props.item, type: 'Private' }
      if (!preset.value.zones) {
        return error.value = '방송구간을 먼저 선택하세요!'
      }
    })

    return {
      user,
      error,
      preset,
      dialogRef,
      onOKClick,
      onDialogHide,
      onCancelClick: onDialogCancel
    }
  }
}
</script>
