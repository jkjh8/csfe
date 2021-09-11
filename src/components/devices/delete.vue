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
          <div style="font-size: 1.5rem; font-weight: bold; font-family: 나눔고딕;">
            디바이스 삭제
          </div>
          <div class="q-mt-md discription">
            이름: <strong>{{ props.selected.name === '' ? 'No Name': props.selected.name }}</strong>, 인덱스: <strong>{{ props.selected.index }}</strong>, IP: <strong>{{ props.selected.ipaddress }}</strong> 해당 디바이스를 삭제 하시겠습니까? 삭제 후에도 장비가 설치되어 있으면 리스트에서 지워지지 않을 수 있습니다.
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

<script>
import { ref, toRefs, inject } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'

export default {
  props: ['selected'],
  setup (props, { emit }) {
    const { dispatch } = useStore()
    const { selected } = toRefs(props)
    const $api = inject('$api')
    const $q = useQuasar()

    const error = ref('')

    const onSubmit = async () => {
      $q.loading.show()
      console.log(selected.value)
      try {
        await $api.get(`/devices/delete?ipaddress=${selected.value.ipaddress} `)
        await dispatch('devices/updateDevices')
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
      props,
      emit,
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
.discription {
  font-family: 나눔고딕;
  color: grey;
}
.discription > strong {
  font-family: 나눔고딕;
  font-size: 1rem;
}
strong {
  color: black;
}
</style>
