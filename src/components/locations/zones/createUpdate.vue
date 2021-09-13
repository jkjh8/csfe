<template>
  <!-- zone create -->
  <q-card style="width: 28rem; border-radius: 2rem;">
    <!-- 이름 테그 -->
    <q-card-section class="q-pa-none">
      <q-img src="/background/cover_1.png" style="height: 6rem;">
        <div class="fit row items-center">
          <q-icon
            class="q-ml-md"
            :name="mode === 'create' ? 'svguse:icons.svg#plus-circle-fill':'svguse:icons.svg#pencil-fill'"
            :color="mode === 'create' ? 'cyan-4':'teal-4'" size="lg"/>
          <div class="q-ml-md">
            <div class="name">{{ mode === 'create' ? 'Zone 추가':'Zone 수정' }}</div>
            <div class="caption">방송구간 추가 및 설정</div>
          </div>
        </div>
      </q-img>
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

    <!-- Start Form -->
    <q-form @submit="onSubmit">
      <q-card-section class="q-pt-sm">
        <div class="q-px-md q-mx-sm colume" style="border-radius: 1rem;">
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
                <div class="text">Parent</div>
                <q-select
                  dense outlined
                  v-model="values.parent"
                  :options="locations"
                  option-label="name"
                  @change="changeParent"
                />
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
              <div>
                <div>
                  <span class="text">Selected Device</span>
                </div>
                <div class="row justify-between items-center">
                  <span v-if="selectDevices.length">
                    <strong>{{ selectDevices[0].name ?? 'No Name' }}</strong> {{ selectDevices[0].ipaddress }}
                    <q-btn round flat icon="svguse:icons.svg#cancel" size="sm" @click="selectNone"></q-btn>
                  </span>
                  <span v-else class="text-grey text-body2">Please Select Device</span>
                  <span><q-btn style="border-radius: 10px;" color="primary" unelevated label="선택" @click="dialog=!dialog"></q-btn></span>
                </div>
              </div>
            </div>
          </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn
          class="q-ma-sm" padding=".5rem 2rem"
          rounded flat
          @click="$emit('close')" label="취소"
        />
        <q-btn
          class="q-mr-md" padding=".5rem 2rem"
          unelevated rounded color="cyan"
          type="submit" label="확인"
        />
      </q-card-actions>
    </q-form>
  </q-card>

  <!-- Dialog for Barix Select -->
  <q-dialog v-model="dialog" persistent>
    <q-card style="width: 46rem; border-radius: 2rem;">
      <q-card-section class="q-pa-none">
        <q-table
          flat
          title="Select Device"
          :rows="devices"
          :columns="[
            { name: 'type', align: 'center', label: 'Type', field: 'type', sortable: true },
            { name: 'name', align: 'center', label: 'Name', field: 'name', sortable: true },
            { name: 'ip', align: 'center', label: 'IP Address', field: 'ipaddress', sortable: true },
            { name: 'updatedAt', align: 'center', label: 'UpdatedAt', field: 'updatedAt', sortable: true },
            { name: 'createdAt', align: 'center', label: 'CreatedAt', field: 'createdAt', sortable: true }
          ]"
          row-key="_id"
          selection="single"
          :filter="filter"
          v-model:selected="selectDevices"
        >
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
          <template v-slot:body-cell-ip="props">
            <q-td :props="props">
              <div>
                {{ props.value }}
              </div>
            </q-td>
          </template>
          <template v-slot:body-cell-updatedAt="props">
            <q-td :props="props">
              <div>
                {{ timeFormat(props.value) }}
              </div>
            </q-td>
          </template>
          <template v-slot:body-cell-createdAt="props">
            <q-td :props="props">
              <div>
                {{ timeFormat(props.value) }}
              </div>
            </q-td>
          </template>
        </q-table>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn class="q-ma-sm" @click="dialog=!dialog" label="취소" />
        <q-btn class="q-ma-sm" padding=".3rem 2rem" rounded unelevated @click="selectDevice" label="확인" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, reactive, onMounted, computed, inject, toRefs } from 'vue'
import secToDays from '@api/secToDays'
import timeFormat from '@api/timeFormat'
import { useQuasar } from 'quasar'
import { useStore } from 'vuex'

export default {
  props: ['selected'],
  emits: ['close'],
  setup (props, { emit }) {
    const $q = useQuasar()
    const { state, getters, dispatch } = useStore()
    const { selected } = toRefs(props)
    const $api = inject('$api')

    const locations = computed(() => state.locations.locations)
    const indexArr = computed(() => getters['zones/getIndexArr'])
    const devices = computed(() => state.devices.deviceList)
    const mode = ref('create')
    const values = ref({ index: null, name: 'No Name', parent: null, device: null, channel: null, check: true })
    const filter = ref('')
    const dialog = ref(false)
    const selectDevices = ref([])
    const error = ref('')

    onMounted(() => {
      if (Object.keys(selected.value).length) {
        mode.value = 'edit'
        values.value = { ...selected.value }
        if (values.value.device && Object.keys(values.value.device).length) {
          selectDevices.value.push(selected.value.device)
        }
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

    const rules = reactive({
      required: [value => !!value || '필수 입력 항목 입니다.'],
      channel: [v => v > 0 || '0~99 사이의 숫자를 선택하세요', v => v < 100 || '0~99 사이의 숫자를 선택하세요']
    })

    function selectDevice () {
      values.value.device = selectDevices.value[0]
      dialog.value = false
    }

    function selectNone () {
      selectDevices.value = []
      values.value.device = null
      dialog.value = false
    }

    function changeParent () {
      console.log('check!!!')
      // values.value.check = values.value.parent.status
    }

    const onSubmit = async () => {
      $q.loading.show()
      try {
        if (mode.value === 'create') {
          await $api.post('/zones', values.value)
        } else {
          await $api.put('/zones', values.value)
        }
        dispatch('zones/updateZones')
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
      filter,
      dialog,
      changeParent,
      selectDevices,
      selectNone,
      rules,
      selectDevice,
      secToDays,
      timeFormat,
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
.q-dialog__inner--minimized > div {
  max-width: 800px;
}
</style>
