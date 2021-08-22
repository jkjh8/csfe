<template>
  <q-card style="width: 100%; border-radius: .5rem;">
    <!-- 이름 테그 -->
    <q-card-section>
      <div class="row">
        <span class="col-2" style="width: 4rem;">
          <q-avatar color="red-1" text-color="red">
            <q-icon name="svguse:icons.svg#exclamation" color="red" size="2rem"/>
          </q-avatar>
        </span>
        <span class="col-10">
          <div style="font-size: 1.5rem; font-weight: bold; font-family: nanumgothicbold;">
            Location 삭제
          </div>
          <div class="q-mt-md discription">
            이름: <strong>{{ props.selectedItem.name }}</strong>, 인덱스: <strong>{{ props.selectedItem.index }}</strong> 해당 지역을 삭제 하시겠습니까? 삭제 후에는 복구가 불가능 하며 설정된 방송 구간에 방송이 송출되지 않을 수 있으니 다시 한번 확인 해주세요.
          </div>
        </span>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions align="right">
      <q-btn class="q-mx-sm text" padding=".3rem 2rem" flat @click="emit('close')" label="취소" />
      <q-btn class="q-mx-sm text confirm" padding=".3rem 2rem" unelevated color="red" @click="onSubmit" label="삭제" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref, defineProps, defineEmits, getCurrentInstance } from 'vue'
import { useQuasar } from 'quasar'

const { proxy } = getCurrentInstance()
const $q = useQuasar()
const props = defineProps({ selectedItem: Object })
const emit = defineEmits(['close'])

const error = ref('')

const onSubmit = async () => {
  $q.loading.show()
  try {
    await proxy.$api.post('/locations/delete', props.selectedItem)
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

<style scoped>
.q-field--outlined .q-field__control:before {
  border: 1px solid #e6e6e6;
}
.q-field--outlined:hover .q-field__control:before {
  border: 1px solid #216dff;
}
.discription {
  font-family: nanumgothic;
  color: grey;
}
.discription > strong {
  font-family: nanumgothicbold;
  font-size: 1rem;
}
</style>
