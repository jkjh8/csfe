<template>
  <q-card class="card-nomal">
    <!-- 이름 테그 -->
    <q-card-section class="q-pa-none">
      <div class="backg-gr-bl">
        <div class="card-name-align">
          <div class="card-name">
            <q-icon
              :name="mode === 'create' ? 'svguse:icons.svg#plus':'svguse:icons.svg#pencil-fill'"
              color="yellow-6"
            />
            <div class="q-ml-md">
              <div style="font-size: 1.2rem; font-weight: bold;">
                {{ mode === 'create' ? '디바이스 추가':'디바이스 수정' }}
              </div>
              <div class="caption">
                {{ mode === 'create' ? '디바이스 추가':'디바이스 수정' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-card-section>

    <q-separator class="q-mb-md" />

    <!-- 에러 메세지 표시창 -->
    <q-card-section
      v-if="error"
      class="q-pb-none q-mx-lg row justify-center"
    >
      <div style="position: relative; height: 3rem; width: 25rem;">
        <div
          class="text-white row justify-end"
          style="position: absolute; border-radius: .5rem; width:100%; height: 3rem; background: #FF0000;"
        >
          <q-btn
            style="z-index: 10;"
            round
            flat
            icon="cancel"
            @click="error=null"
          />
        </div>
        <div style="position: absolute;width:100%; text-align: center; color: white; line-height: 3rem;">
          {{ error }}
        </div>
      </div>
    </q-card-section>

    <q-form @submit="onSubmit">
      <q-card-section
        class="q-pt-sm q-mb-md row justify-center scroll"
        style="max-height: 50vh"
      >
        <div
          class="colume update"
          style="width: 20rem;"
        >
          <div class="text">
            디바이스 인덱스
          </div>
          <q-input
            v-model="deviceInfo.index"
            dense
            outlined
            bg-color="white"
            type="number"
          />
          <div class="text margin-top">
            디바이스 이름
          </div>
          <q-input
            v-model="deviceInfo.name"
            dense
            outlined
            bg-color="white"
            placeholder="Device Name"
          />
          <div class="text margin-top">
            IP Address
          </div>
          <q-input
            v-model="deviceInfo.ipaddress"
            :disable="mode === 'create' ? false:true"
            dense
            outlined
            bg-color="white"
            lazy-rules
            :rules="[
              $rules.required('필수 입력 항목 입니다.'),
              $rules.ipAddress('IP 주소 형식이 아닙니다.')
            ]"
            placeholder="Ip Address"
          />
          <div class="text">
            Mac Address
          </div>
          <q-input
            v-model="deviceInfo.mac"
            :disable="mode === 'create' ? false:true"
            dense
            outlined
            bg-color="white"
            placeholder="Mac Address"
          />
          <div class="text margin-top">
            Device Type
          </div>
          <q-select
            v-model="deviceInfo.type"
            dense
            outlined
            bg-color="white"
            :options="['Barix', 'QSys']"
            label="Select device type"
          />
          <div v-if="deviceInfo.type === 'Barix'">
            <div class="text margin-top">
              Mode
            </div>
            <q-select
              v-model="deviceInfo.mode"
              dense
              outlined
              bg-color="white"
              :options="['Input', 'Output']"
              label="Select device active mode"
            />
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn
          class="q-mr-sm"
          padding=".5rem 2rem"
          flat
          rounded
          label="취소"
          @click="emit('close')"
        />
        <q-btn
          class="q-mr-sm"
          padding=".5rem 2rem"
          unelevated
          rounded
          color="blue-grey-4"
          type="submit"
          label="확인"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useQuasar } from 'quasar'
import { useStore } from 'vuex'
import { api } from '@/boot/axios'

export default {
  props: {
    id: String
  },
  emits: ['close'],
  setup (props, { emit }) {
    const { getters, dispatch } = useStore()
    const $q = useQuasar()
    const locationNames = computed(() => getters['locations/getLocationNames'])
    const indexArr = computed(() => getters['devices/getIndexArr'])
    const mode = ref('create')
    const error = ref('')
    const deviceInfo = ref({
      index: null,
      name: '',
      mac: '',
      type: 'QSys',
      mode: 'Input',
      checked: false,
      ipaddress: ''
    })

    const onSubmit = async () => {
      $q.loading.show()
      try {
        if (mode.value === 'create') {
          await api.post('/devices', deviceInfo.value)
        } else {
          await api.put('/devices', deviceInfo.value)
        }
        await dispatch('devices/updateDevices')
        $q.loading.hide()
        emit('close')
      } catch (err) {
        $q.loading.hide()
        error.value = err.response.data.message
        console.error(err)
      }
    }

    onMounted(async () => {
      $q.loading.show()
      if (props.id) {
        const r = await api.get(`/devices/info?id=${props.id}`)
        if (r) {
          mode.value = 'edit'
          deviceInfo.value = r.data
        } else {
          mode.value = 'create'
        }
      } else {
        mode.value = 'create'
      }
      $q.loading.hide()
      if (!deviceInfo.value.index) {
        for (let i = 1; i <= indexArr.value.length + 1; i++) {
          if (!indexArr.value.includes(i)) {
            deviceInfo.value.index = i
            break
          }
        }
      }
    })

    return {
      locationNames,
      mode,
      error,
      deviceInfo,
      onSubmit,
      emit
    }
  }
}
</script>

<style>
.text {
  font-weight: bold;
  font-family: 나눔고딕;
  font-size: 1rem;
}
.confirm {
  background: #22d3ee;
  margin-right: 2rem;
}
.q-field--outlined .q-field__control:before {
  border: 1px solid #e1e1e1;
}
.q-field--outlined:hover .q-field__control:before {
  border: 1px solid #216dff;
}
.info {
  padding: .5rem .5rem;
}
.margin-top {
  margin-top: 1rem;
}
:deep(.q-img__image) {
  -webkit-filter: blur(4px);
  filter: blur(4px);
}
</style>
