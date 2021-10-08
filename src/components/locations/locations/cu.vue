<template>
  <q-card
    class="card-nomal"
    style="border-radius: 1rem;"
  >
    <!-- 이름 테그 -->
    <q-card-section class="q-pa-none">
      <div class="backg-gr-bl">
        <div class="card-name-align">
          <div class="card-name">
            <q-icon
              :name="
                mode === 'create'
                  ? 'svguse:icons.svg#plus-circle-fill'
                  : 'svguse:icons.svg#pencil-fill'
              "
              :color="mode === 'create' ? 'grey' : 'purple'"
            />
            <div>
              <div>
                {{ mode === 'create' ? 'Location 추가' : 'Location 수정' }}
              </div>
              <div class="caption">
                지역단위 혹은 본부 DSP 추가 및 설정
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-card-section>

    <q-separator class="q-mb-sm" />

    <!-- 에러 메세지 표시창 -->
    <q-card-section
      v-if="error"
      class="q-pb-none q-mx-lg"
    >
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
        <div class="q-pa-md colume">
          <div class="q-pa-sm q-gutter-sm">
            <div>
              <div class="text">
                지역 인덱스
              </div>
              <q-input
                v-model="selectedLocation.index"
                dense
                outlined
                bg-color="white"
                type="number"
              />
            </div>
            <div class="q-mt-md">
              <div class="text">
                지역 이름
              </div>
              <q-input
                v-model="selectedLocation.name"
                dense
                outlined
                bg-color="white"
                placeholder="No Name"
              />
            </div>
            <div>
              <div class="text">
                Type
              </div>
              <q-select
                v-model="selectedLocation.type"
                dense
                outlined
                :options="['Q-Sys', 'Barix']"
              />
            </div>
            <div v-if="selectedLocation.type === 'Q-Sys'">
              <div class="text">
                Device
              </div>
              <q-select
                v-model="selectedLocation.device._id"
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

            <div v-if="selectedLocation.type === 'Barix'">
              <div class="text">
                Device
              </div>
              <q-select
                v-model="selectedLocation.device._id"
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
        <div class="q-mx-sm q-gutter-sm row items-center">
          <q-btn
            style="width: 6rem; height: 2rem"
            flat
            rounded
            label="취소"
            @click="emit('close')"
          />
          <q-btn
            style="width: 6rem; height: 2rem"
            unelevated
            rounded
            color="primary"
            type="submit"
            label="확인"
          />
        </div>
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
  setup(props, { emit }) {
    const { getters, dispatch } = useStore()
    const $q = useQuasar()
    const locationNames = computed(() => getters['locations/getLocationNames'])
    const indexArr = computed(() => getters['locations/getLocationsIndexArr'])
    const qsysList = computed(() => getters['devices/QsysList'])
    const barixList = computed(() => getters['devices/BarixList'])

    const mode = ref('create')
    const error = ref('')
    const selectedLocation = ref({
      index: null,
      name: '',
      device: {
        _id: ''
      },
      type: 'Q-Sys'
    })

    const onSubmit = async () => {
      $q.loading.show()
      try {
        if (selectedLocation.value.name === '') {
          selectedLocation.value = 'No Name'
        }
        if (mode.value === 'create') {
          await api.post('/locations', selectedLocation.value)
        } else {
          await api.put('/locations', selectedLocation.value)
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

    onMounted(async () => {
      if (props.id) {
        const r = await api.get(`/locations/info?id=${props.id}`)
        if (r) {
          mode.value = 'edit'
          selectedLocation.value = r.data.r
          selectedLocation.value.device = r.data.devi
          console.log(selectedLocation.value)
        } else {
          mode.value = 'create'
        }
      } else {
        mode.value = 'create'
      }
      if (!selectedLocation.value.index) {
        for (let i = 1; i <= indexArr.value.length + 1; i++) {
          if (!indexArr.value.includes(i)) {
            selectedLocation.value.index = i
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
      selectedLocation,
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
