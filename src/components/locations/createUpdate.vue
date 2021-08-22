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
            {{ mode === 'create' ? 'Location 추가':'Location 수정' }}
          </div>
          <div class="discription">지역단위 혹은 본부 DSP 추가 및 설정</div>
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
            <div>
              <div class="text">지역 인덱스</div>
              <q-input
                v-model="values.index"
                dense outlined bg-color="white" type="number"
              />
            </div>
            <div class="q-mt-md">
              <div class="text">지역 이름</div>
              <q-input
                v-model="values.name"
                dense outlined bg-color="white"
                lazy-rules :rules="rules.required"
              />
            </div>
            <div>
              <div class="text">IP Address</div>
              <q-input
                v-model="values.ip"
                dense outlined bg-color="white"
                lazy-rules :rules="rules.required"
              />
            </div>
            <div>
              <div class="text">Port</div>
              <q-input
                v-model="values.port"
                dense outlined bg-color="white" type="number"
                lazy-rules
                :rules="rules.port"
              />
            </div>
            <div>
              <div class="text">Mode</div>
              <q-select dense outlined v-model="values.mode" :options="['Q-sys', 'Barix']" />
            </div>

            <!-- mode 종속 -->
            <div v-if="values.mode === 'Barix'"
              class="q-mt-sm q-py-sm q-px-md"
              style="border: 1px solid #e4e4e4; border-radius: 1rem;"
            >
              <div>
                <div class="text">Parent</div>
                <q-select dense outlined v-model="values.parent" :options="locationNames" />
              </div>
              <div>
                <div class="text">채널</div>
                <q-input
                  v-model="values.channel"
                  dense outlined bg-color="white" type="number"
                  lazy-rules
                  :rules="rules.channel"
                />
              </div>
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

<script setup>
import { ref, reactive, defineProps, defineEmits, onMounted, computed, getCurrentInstance } from 'vue'
import { useQuasar } from 'quasar'

const { proxy } = getCurrentInstance()
const $q = useQuasar()
const props = defineProps({ selectedItem: Object })
const emit = defineEmits(['close'])

const locationNames = computed(() => proxy.$store.getters['locations/getLocationNames'])
const mode = ref('create')
const values = ref({ index: 1, name: '', ip: '', port: 1720, mode: 'Q-sys', parent: '', channel: null })
const error = ref('')

onMounted(() => {
  if (Object.keys(props.selectedItem).length) {
    mode.value = 'edit'
    values.value = { ...props.selectedItem }
  } else {
    mode.value = 'create'
  }
})

const rules = reactive({
  required: [value => !!value || '필수 입력 항목 입니다.'],
  port: [v => v > 0 || '0~65535 사이의 숫자를 선택하세요', v => v < 65536 || '0~65535 사이의 숫자를 선택하세요'],
  channel: [v => v > 0 || '0~99 사이의 숫자를 선택하세요', v => v < 100 || '0~99 사이의 숫자를 선택하세요']
})

const onSubmit = async () => {
  $q.loading.show()
  try {
    if (mode.value === 'create') {
      await proxy.$api.post('/locations', values.value)
    } else {
      await proxy.$api.put('/locations', values.value)
    }
    proxy.$store.dispatch('locations/updateLocations')
    $q.loading.hide()
    emit('close')
  } catch (err) {
    $q.loading.hide()
    error.value = err.response.data.message
    console.error(err)
  }
}
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
