<template>
  <q-card style="width: 26rem; border-radius: 2rem">
    <!-- 이름 테그 -->
    <q-card-section class="q-pa-none" style="overflow: hidden">
      <q-img src="/background/cover_1.png" style="height: 6rem">
        <div class="fit row items-center">
          <div class="q-ml-md">
            <q-icon
              :name="
                mode === 'create'
                  ? 'svguse:icons.svg#plus-circle-fill'
                  : 'svguse:icons.svg#pencil-fill'
              "
              :color="mode === 'create' ? 'cyan-6' : 'cyan-4'"
              size="2rem"
            />
          </div>
          <div class="q-ml-md">
            <div
              style="font-size: 1.2rem; font-weight: 700; font-family: 나눔고딕"
            >
              {{ mode === 'create' ? 'Location 추가' : 'Location 수정' }}
            </div>
            <div class="caption">지역단위 혹은 본부 DSP 추가 및 설정</div>
          </div>
        </div>
      </q-img>
    </q-card-section>

    <q-separator class="q-mb-sm" />

    <!-- 에러 메세지 표시창 -->
    <q-card-section v-if="error" class="q-pb-none q-mx-lg">
      <div style="position: relative; height: 3rem">
        <div
          class="text-white row justify-end"
          style="
            position: absolute;
            border-radius: 0.5rem;
            width: 100%;
            height: 3rem;
            background: #ff0000;
          "
        >
          <q-btn
            style="z-index: 10"
            round
            flat
            icon="cancel"
            @click="error = null"
          />
        </div>
        <div
          style="
            position: absolute;
            width: 100%;
            text-align: center;
            color: white;
            line-height: 3rem;
          "
        >
          {{ error }}
        </div>
      </div>
    </q-card-section>

    <q-form @submit="onSubmit">
      <q-card-section class="q-pt-sm">
        <div class="q-px-md q-mx-sm colume" style="border-radius: 1rem">
          <div class="q-pa-sm q-gutter-sm">
            <div>
              <div class="text">지역 인덱스</div>
              <q-input
                v-model="values.index"
                dense
                outlined
                bg-color="white"
                type="number"
              />
            </div>
            <div class="q-mt-md">
              <div class="text">지역 이름</div>
              <q-input
                v-model="values.name"
                dense
                outlined
                bg-color="white"
                placeholder="No Name"
              />
            </div>
            <div>
              <div class="text">Type</div>
              <q-select
                v-model="values.type"
                dense
                outlined
                :options="['Q-Sys', 'Barix']"
              />
            </div>
            <div v-if="values.type === 'Q-Sys'">
              <div class="text">Device</div>
              <q-select
                v-model="values.device_id"
                dense
                outlined
                :options="qsysList"
                :option-label="
                  opt =>
                    Object(opt) === opt && 'name' in opt
                      ? `${opt.name} ${opt.ipaddress}`
                      : '이름없음'
                "
                option-value="_id"
                emit-value
                map-options
              >
                <template #option="scope">
                  <q-item v-bind="scope.itemProps">
                    <q-item-section>
                      <q-item-label>{{ scope.opt.name }}</q-item-label>
                      <q-item-label caption>
                        {{ scope.opt.ipaddress }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>

            <div v-if="values.type === 'Barix'">
              <div class="text">Device</div>
              <q-select
                v-model="values.device_id"
                dense
                outlined
                :options="barixList"
                :option-label="
                  opt =>
                    Object(opt) === opt && 'name' in opt
                      ? `${opt.name} ${opt.ipaddress}`
                      : '이름없음'
                "
                option-value="_id"
                emit-value
                map-options
              >
                <template #option="scope">
                  <q-item v-bind="scope.itemProps">
                    <q-item-section>
                      <q-item-label>{{ scope.opt.name }}</q-item-label>
                      <q-item-label caption>
                        {{ scope.opt.ipaddress }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn
          class="q-ma-sm text"
          padding=".5rem 2rem"
          flat
          label="취소"
          @click="emit('close')"
        />
        <q-btn
          class="q-ma-sm text confirm"
          padding=".5rem 2rem"
          unelevated
          type="submit"
          label="확인"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { inject, ref, toRefs, onMounted, computed } from 'vue'
import { useQuasar } from 'quasar'
import { useStore } from 'vuex'

export default {
  props: ['selected'],
  emits: ['close'],
  setup(props, { emit }) {
    const { selected } = toRefs(props)
    const $api = inject('$api')
    const { getters, dispatch } = useStore()
    const $q = useQuasar()
    const locationNames = computed(() => getters['locations/getLocationNames'])
    const indexArr = computed(() => getters['locations/getLocationsIndexArr'])
    const qsysList = computed(() => getters['devices/QsysList'])
    const barixList = computed(() => getters['devices/BarixList'])

    const mode = ref('create')
    const error = ref('')
    const values = ref({
      index: null,
      name: '',
      device_id: '',
      type: 'Q-Sys',
      device: null
    })

    const onSubmit = async () => {
      $q.loading.show()
      try {
        if (values.value.name === '') {
          values.value = 'No Name'
        }
        if (mode.value === 'create') {
          await $api.post('/locations', values.value)
        } else {
          await $api.put('/locations', values.value)
        }
        await dispatch('locations/updateLocations')
        $q.loading.hide()
        emit('close')
      } catch (err) {
        $q.loading.hide()
        error.value = err.response.data.message
        console.error(err)
      }
    }

    onMounted(() => {
      if (Object.keys(selected.value).length) {
        mode.value = 'edit'
        values.value = { ...selected.value }
      } else {
        mode.value = 'create'
      }
      if (!values.value.index) {
        for (let i = 1; i <= indexArr.value.length + 1; i++) {
          if (!indexArr.value.includes(i)) {
            values.value.index = i
            break
          }
        }
      }
    })

    return {
      qsysList,
      barixList,
      locationNames,
      mode,
      error,
      values,
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
  font-weight: 700;
  font-family: 나눔고딕;
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
  font-family: 나눔고딕;
  color: grey;
  font-size: 0.8rem;
}
</style>
