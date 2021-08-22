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
            {{ mode === 'create' ? 'Zone 추가':'Zone 수정' }}
          </div>
          <div class="discription">방송구간 추가 및 설정</div>
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
              <div class="text">Mode</div>
              <q-select dense outlined v-model="values.mode" :options="['Barix']" />
            </div>

            <!-- mode 종속 -->
            <div v-if="values.mode === 'Barix'"
              class="q-mt-sm q-py-sm q-px-md"
              style="border: 1px solid #e4e4e4; border-radius: 1rem;"
            >
              <div>
                <div class="text">Parent</div>
                <q-select dense outlined v-model="values.location" :options="locationNames" />
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
                <div class="row justify-between items-center">
                  <span class="text">Barix</span>
                  <span><q-btn color="primary" unelevated label="Select" @click="dialog=!dialog"></q-btn></span>
                </div>
                <div>{{ values }}</div>
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

  <q-dialog v-model="dialog" full-width persistent>
    <q-card class="q-ma-xl">
      <q-card-section>
        <q-table
          title="Select Barix"
          :rows="barixes"
          :columns="[
           { name: 'name', align: 'center', label: 'Name', field: 'name', sortable: true },
           { name: 'ip', align: 'center', label: 'IP Address', field: 'ipaddress', sortable: true },
           { name: 'mac', align: 'center', label: 'MAC Address', field: 'mac', sortable: true },
           { name: 'uptime', align: 'center', label: 'UpTime', field: 'uptime', sortable: true },
           { name: 'updateAt', align: 'center', label: 'UpdateAt', field: 'updateAt', sortable: true },
           { name: 'createdAt', align: 'center', label: 'CreatedAt', field: 'createdAt', sortable: true }
          ]"
          row-key="_id"
          selection="single"
          :filter="filter"
          v-model:selected="selected"
        >
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
          <template v-slot:body-cell-uptime="props">
            <q-td :props="props">
              <div>
                {{ secToDays(props.value) }}
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
        <q-btn class="q-ma-sm text" padding=".3rem 2rem" flat @click="dialog=!dialog" label="취소" />
        <q-btn class="q-ma-sm text confirm" padding=".3rem 2rem" unelevated @click="selectBarix" label="확인" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, reactive, defineProps, defineEmits, onMounted, computed, getCurrentInstance } from 'vue'
import secToDays from '../../apis/secToDays'
import timeFormat from '../../apis/timeFormat'
import { useQuasar } from 'quasar'

const { proxy } = getCurrentInstance()
const $q = useQuasar()
const props = defineProps({ selectedItem: Object })
const emit = defineEmits(['close'])

const locationNames = computed(() => proxy.$store.getters['locations/getLocationNames'])
const barixes = computed(() => proxy.$store.state.barix.deviceList)
const mode = ref('create')
const values = ref({ index: 1, name: '', mode: 'Barix', location: '', channel: null, mac: '' })
const filter = ref('')
const dialog = ref(false)
const selected = ref([])
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

function selectBarix () {
  console.log(selected.value[0])
  values.value.mac = selected.value[0].mac
  dialog.value = false
}

const onSubmit = async () => {
  $q.loading.show()
  try {
    if (mode.value === 'create') {
      await proxy.$api.post('/zones', values.value)
    } else {
      await proxy.$api.put('/zones', values.value)
    }
    proxy.$store.dispatch('zones/updateZones')
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
