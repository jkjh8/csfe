<template>
  <q-card style="width: 20rem; border-radius: 2rem;">
    <!-- 이름 테그 -->
    <q-card-section class="q-pa-none">
      <q-img
        src="/background/cover_27.jpg"
        style="height: 6rem;"
      >
        <div class="fit row items-center">
          <q-icon
            name="svguse:icons.svg#exclamation"
            color="red"
            size="md"
          />
          <div class="q-ml-md name">
            방송구간 삭제
          </div>
        </div>
      </q-img>
    </q-card-section>

    <q-card-section style="height: 12rem;">
      <div class="q-mt-md text">
        이름: <strong>{{ props.selected.name }}</strong>, 인덱스: <strong>{{ props.selected.index }}</strong> 해당 지역을 삭제 하시겠습니까?<br> 삭제 후에는 복구가 불가능 하며 설정된 방송 구간에 방송이 송출되지 않을 수 있으니 다시 한번 확인 해주세요.
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions align="right">
      <q-btn
        class="q-mx-sm text"
        padding=".3rem 2rem"
        flat
        rounded
        label="취소"
        @click="emit('close')"
      />
      <q-btn
        class="q-mx-sm"
        padding=".3rem 2rem"
        rounded
        unelevated
        color="red"
        label="삭제"
        @click="onSubmit"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { ref, toRefs, inject } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'

export default {
  props: {
    selected: Object
  },
  emits: ['close'],
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
.text {
  font-family: 나눔고딕;
  font-size: .9rem;
  font-weight: 400;
  color: #333;
}
</style>
