<template>
  <q-card style="width: 100%; border-radius: 1rem;">
    <!-- 이름 테그 -->
    <q-card-section>
      <div class="row items-center">
        <div class="col-1" style="width: 4rem;">
          <q-icon :name="mode === 'create' ? 'svguse:icons.svg#plus-circle-fill':'svguse:icons.svg#pencil-fill'"
            :color="mode === 'create' ? 'cyan-6':'teal-6'" size="3rem"/>
        </div>
        <div class="col-10">
          <div style="font-size: 1.2rem; font-weight: bold; font-family: nanumgothicbold;">
            {{ mode === 'create' ? '디바이스 추가':'디바이스 수정' }}
          </div>
          <div class="discription">디바이스 설정</div>
        </div>
      </div>
    </q-card-section>

    <q-separator class="q-mb-sm" />

    <!-- 에러 메세지 표시창 -->
      <q-card-section class="q-pb-none q-mx-lg" v-if="error">
        <div style="position: relative; height: 3rem;">
          <div
            class="text-white row justify-end"
            style="position: absolute; border-radius: .5rem; width:100%; height: 3rem; background: #FF0000;"
          >
            <q-btn style="z-index: 10;" round flat icon="cancel" @click="error=null"></q-btn>
          </div>
          <div style="position: absolute;width:100%; text-align: center; color: white; line-height: 3rem;">
            {{ error }}
          </div>
        </div>
      </q-card-section>

    <q-form @submit="onSubmit">
      <q-card-section class="q-pt-sm">
        <div class="q-px-sm q-mx-sm colume" style="border-radius: 1rem;">
          <div class="q-pa-sm">
            <div class="row justify-between items-center">
              <div class="text">디바이스 확인</div>
              <q-checkbox
                disable
                v-model="values.checked"
              />
            </div>
            <div class="q-mt-md">
              <div class="text">디바이스 인덱스</div>
              <q-input
                v-model="values.index"
                dense outlined bg-color="white" type="number"
              />
            </div>
            <div class="q-mt-md">
              <div class="text">디바이스 이름</div>
              <q-input
                v-model="values.name"
                dense outlined bg-color="white"
              />
            </div>
            <div>
              <div class="text">IP Address</div>
              <q-input
                :disable="mode === 'create' ? false:true"
                v-model="values.info.IP_address"
                dense outlined bg-color="white"
              />
            </div>
            <div>
              <div class="text">Mac Address</div>
              <q-input
                :disable="mode === 'create' ? false:true"
                v-model="values.mac"
                dense outlined bg-color="white"
                laze-rules :rules="rules.mac"
              />
            </div>
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn class="q-ma-sm text" padding=".5rem 2rem" flat @click="emit('close')" label="취소" />
        <q-btn class="q-ma-sm text confirm" padding=".5rem 2rem" unelevated type="submit" label="확인" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { inject, ref, toRefs, reactive, onMounted, computed } from 'vue'
import { useQuasar } from 'quasar'
import { useStore } from 'vuex'

export default {
  props: ['selected'],
  emits: ['close'],
  setup (props, { emit }) {
    const { selected } = toRefs(props)
    const $api = inject('$api')
    const { getters, dispatch } = useStore()
    const $q = useQuasar()
    const locationNames = computed(() => getters['locations/getLocationNames'])
    const mode = ref('create')
    const error = ref('')
    const values = ref({
      index: 1,
      name: '',
      mac: '',
      checked: false,
      info: {
        IP_address: '',
        UpTime: 0,
        Volume: 0
      }
    })
    const rules = reactive({
      required: [value => !!value || '필수 입력 항목 입니다.'],
      mac: [value => !!value || '필수 입력 항목 입니다.', v => v.length === 12 || 'MAC Address를 확인해주세요.'],
      port: [v => v > 0 || '0~65535 사이의 숫자를 선택하세요', v => v < 65536 || '0~65535 사이의 숫자를 선택하세요'],
      channel: [v => v > 0 || '0~99 사이의 숫자를 선택하세요', v => v < 100 || '0~99 사이의 숫자를 선택하세요']
    })

    const onSubmit = async () => {
      $q.loading.show()
      try {
        if (mode.value === 'create') {
          await $api.post('/devices', values.value)
        } else {
          await $api.put('/devices', values.value)
        }
        await dispatch('barix/updateDevices')
        $q.loading.hide()
        emit('close')
      } catch (err) {
        $q.loading.hide()
        error.value = err.response.data.message
        console.error(err)
      }
    }

    onMounted(() => {
      if (selected.value && Object.keys(selected.value).length) {
        mode.value = 'edit'
        for (const property in selected.value) {
          values.value[property] = selected.value[property]
        }
      } else {
        mode.value = 'create'
      }
    })

    return {
      locationNames,
      mode,
      error,
      values,
      rules,
      onSubmit,
      emit
    }
  }
}
// const { proxy } = getCurrentInstance()

// const props = defineProps({ selectedItem: Object })
// const emit = defineEmits(['close'])

</script>

<style>
.text {
  font-weight: bold;
  font-family: nanumgothicbold;
  font-size: 1rem;
}
.confirm {
  background: #22d3ee;
}
.q-field--outlined .q-field__control:before {
  border: 1px solid #e6e6e6;
}
.q-field--outlined:hover .q-field__control:before {
  border: 1px solid #216dff;
}
.discription {
  font-family: nanumgothic;
  color: grey;
  font-size: .8rem;
}
</style>
