<template>
  <!-- zone create -->
  <q-card
    class="card-nomal"
    style="border-radius: 1rem;"
  >
    <!-- 이름 테그 -->
    <q-card-section class="q-pa-none">
      <div class="backg-gr-bl">
        <div class="card-name-align">
          <div class="card-name">
            <q-avatar
              class="q-ml-sm"
              style="border: solid 1px #eee;"
              size="2rem"
            >
              <q-icon
                color="grey-2"
                size="1rem"
                name="svguse:icons.svg#pencil-fill"
              />
            </q-avatar>
            <div class="q-ml-md">
              <div class="name">
                방송구역 수정
              </div>
              <div class="caption">
                방송구간 추가 및 설정
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
      <div style="position: relative; height: 3rem;">
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

    <!-- Start Form -->
    <q-form @submit="onSubmit">
      <q-card-section class="q-pt-sm">
        <div
          class="q-px-md q-mx-sm colume"
          style="border-radius: 1rem;"
        >
          <div class="q-pa-sm">
            <div>
              <div class="subname">
                지역 인덱스
              </div>
              <q-input
                v-model="values.index"
                dense
                outlined
                bg-color="white"
                type="number"
              />
            </div>
            <div class="q-mt-md">
              <div class="subname">
                지역 이름
              </div>
              <q-input
                v-model="values.name"
                dense
                outlined
                bg-color="white"
                lazy-rules
                :rules="rules.required"
              />
            </div>
            <div>
              <div class="subname">
                IP Address
              </div>
              <q-input
                v-model="values.ipaddress"
                disable
                dense
                outlined
                bg-color="white"
                lazy-rules
                :rules="rules.required"
              />
            </div>
            <div>
              <div class="subname">
                location
              </div>
              <q-select
                v-model="values.parent_id"
                dense
                outlined
                :options="locations"
                :display-value="selectedlocation"
                option-value="_id"
                option-label="name"
                @update:model-value="changelocation"
              />
            </div>
            <div>
              <div class="q-mt-md subname">
                채널
              </div>
              <q-input
                v-model="values.channel"
                dense
                outlined
                bg-color="white"
                type="number"
                lazy-rules
                :rules="rules.channel"
              />
            </div>
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <div class="q-mx-sm q-gutter-sm row items-center">
          <q-btn
            style="width: 6rem; height: 2rem"
            rounded
            flat
            label="취소"
            @click="$emit('close')"
          />
          <q-btn
            style="width: 6rem; height: 2rem"
            unelevated
            rounded
            color="cyan"
            type="submit"
            label="확인"
          />
        </div>
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { ref, reactive, onMounted, computed, inject, toRefs } from 'vue'
import { useQuasar } from 'quasar'
import { useStore } from 'vuex'

export default {
  props: {
    selected: Object
  },
  emits: ['close'],
  setup (props, { emit }) {
    const $q = useQuasar()
    const { state, getters, dispatch } = useStore()
    const { selected } = toRefs(props)
    const $api = inject('$api')

    const locations = computed(() => state.locations.locations)
    const indexArr = computed(() => getters['locations/getZonesIndexArr'])
    const devices = computed(() => state.devices.devices)
    const selectedlocation = ref('')

    const mode = ref('create')
    const values = ref({
      index: null,
      name: 'No Name',
      parent_id: null,
      location_name: '',
      device: null,
      ipaddress: '',
      channel: null,
      check: true,
      status: false
    })
    const error = ref('')

    onMounted(() => {
      values.value = { ...selected.value }
      if (!values.value.index) {
        for (let i = 1; i <= indexArr.value.length + 1; i++) {
          if (!indexArr.value.includes(i)) {
            values.value.index = i
            break
          }
        }
      }
      locations.value.forEach(e => {
        if (e._id === values.value.parent_id) {
          console.log('selected = ', e._id)
          selectedlocation.value = e.name
        }
      })
    })

    const rules = reactive({
      required: [value => !!value || '필수 입력 항목 입니다.'],
      channel: [v => v > 0 || '0~99 사이의 숫자를 선택하세요', v => v < 100 || '0~99 사이의 숫자를 선택하세요']
    })

    function changelocation (location) {
      selectedlocation.value = location.name
      values.value.location_name = location.name
    }

    const onSubmit = async () => {
      $q.loading.show()
      try {
        await $api.put('/devices', values.value)
        dispatch('devices/updateDevices')
        $q.loading.hide()
        emit('close')
      } catch (err) {
        $q.loading.hide()
        error.value = err.response.data.message
        console.error(err)
      }
    }
    return {
      error,
      mode,
      locations,
      devices,
      values,
      changelocation,
      selectedlocation,
      rules,
      onSubmit
    }
  }
}
</script>

<style scoped>
.q-field--outlined .q-field__control:before {
  border: 1px solid #e6e6e6;
}
.q-field--outlined:hover .q-field__control:before {
  border: 1px solid #216dff;
}
.subname {
  font-family: 나눔고딕;
  font-weight: 700;
}
/* .q-dialog__inner--minimized > div {
  max-width: 800px;
} */
</style>
