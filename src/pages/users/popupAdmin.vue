<template>
  <q-card style="width: 20rem; border-radius: 1rem">
    <!-- 이름 테그 -->
    <q-card-section class="q-pa-none">
      <div class="backg">
        <div class="fit row items-center">
          <q-icon
            class="q-ml-md"
            name="svguse:icons.svg#exclamation"
            color="red"
            size="md"
          />
          <div class="q-ml-sm name">
            관리자 권한 수정
          </div>
        </div>
      </div>
    </q-card-section>
    <q-card-section style="height: 14rem">
      <div v-if="user.admin">
        <span class="name">{{ user.email }}</span> 사용자에게 관리자 권한을
        <span class="name text-red">회수</span>하시겠습니까?
      </div>
      <div
        v-else
        class="q-pa-md"
        style="height: 8rem"
      >
        <span class="name">{{ user.email }}</span> 사용자에게 관리자 권한을
        <span class="name text-red">부여</span>하시겠습니까?
      </div>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn
        v-close-popup
        padding=".3rem 2rem"
        flat
        rounded
        label="취소"
      />
      <q-btn
        class="q-mx-md"
        padding=".3rem 2rem"
        unelevated
        rounded
        color="cyan"
        label="확인"
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
    user: Object
  },
  emits: ['close'],
  setup(props, { emit }) {
    const { dispatch } = useStore()
    const { user } = toRefs(props)
    const $api = inject('$api')
    const $q = useQuasar()

    const error = ref('')

    const onSubmit = async () => {
      $q.loading.show()
      try {
        await $api.get(
          `/auth/users/admin?id=${user.value._id}&value=${!user.value.admin}`
        )
        $q.loading.hide()
        await dispatch('user/getUsers')
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
      onSubmit,
    }
  },
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
.backg {
  height: 6rem;
  color: #fff;
  z-index: 1;
  background: linear-gradient(226deg, rgba(255,0,0,.8), rgba(255,0,0,0) 60.71%),
              linear-gradient(127deg, rgba(0,180,0,.8), rgba(0,255,0,0) 90.71%),
              linear-gradient(333deg, rgba(0,0,255,.8), rgba(0,0,255,0) 99%);
}
</style>
