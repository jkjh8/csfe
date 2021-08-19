<template>
  <q-card style="width: 25rem; border-radius: 1rem;">
    <q-card-section class="row items-center q-gutter-sm">
      <q-icon name="add_circle" size="1.5rem" />
      <div>지역추가</div>
    </q-card-section>

    <q-separator />
    <q-card-section v-if="error" class="q-py-xs">
      <div class="q-pa-sm q-ma-sm" style="background: #FF312B; color: white; border-radius: 1rem;">
        <div class="q-pa-sm" style="text-align: center;">{{error}}</div>
      </div>
    </q-card-section>

    <q-form @submit="onSubmit">
      <q-card-section class="q-py-xs">
        <div class="q-pa-sm q-ma-sm colume" style="background: #E7FFFF; border-radius: 1rem;">
          <div class="q-pa-sm">
            <div class="q-gutter-sm">
              <div>지역 아이디</div>
              <q-input
                v-model="values.index"
                dense outlined bg-color="white" type="number"
              />
            </div>
            <div class="q-gutter-sm">
              <div>지역 이름</div>
              <q-input
                v-model="values.name"
                dense outlined bg-color="white"
                lazy-rules :rules="rules.required"
              />
            </div>
            <div class="q-gutter-sm">
              <div>IP Address</div>
              <q-input
                v-model="values.ip"
                dense outlined bg-color="white"
                lazy-rules :rules="rules.required"
              />
            </div>
            <div class="q-gutter-sm">
              <div>Port</div>
              <q-input
                v-model="values.port"
                dense outlined bg-color="white" type="number" placeholder="1720"
              />
            </div>
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn class="q-mx-sm btn" padding=".5rem 2rem" flat @click="emit('close')" label="취소" />
        <q-btn class="q-mx-sm btn" padding=".5rem 2rem" unelevated type="submit" label="확인" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup>
import { ref, reactive, defineProps, defineEmits, onMounted, getCurrentInstance } from 'vue'
import { useQuasar } from 'quasar'

const { proxy } = getCurrentInstance()
const $q = useQuasar()
const props = defineProps({ selectedItem: Object })
const emit = defineEmits(['close'])

const mode = ref('create')
const values = ref({ index: 0, name: '', ip: '', port: 1720 })
const error = ref('')

onMounted(() => {
  if (Object.keys(props.selectedItem).length) {
    mode.value = 'edit'
    values.value = { ...props.selectedItem }
  } else {
    mode.value = 'create'
  }
})

const rules = reactive({ required: [value => !!value || '필수 입력 항목 입니다.'] })

const onSubmit = async () => {
  $q.loading.show()
  try {
    if (mode.value === 'create') {
      await proxy.$api.post('/locations', values.value)
    } else {
      await proxy.$api.put('/locations', values.value)
    }
    const r = await proxy.$api.get('/locations')
    proxy.$store.dispatch('locations/updateLocations', r.data.data)
    $q.loading.hide()
    emit('close')
  } catch (err) {
    $q.loading.hide()
    error.value = err.response.data.message
    console.error(err)
  }
}
</script>
