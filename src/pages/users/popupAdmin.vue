<template>
  <q-card style="width: 20rem; border-radius: 2rem;">
    <!-- 이름 테그 -->
    <q-card-section class="q-pa-none">
      <q-img src="/background/cover_1.jpg" style="height: 6rem;">
        <div class="fit row items-center">
          <q-icon
            class="q-ml-md"
            name="svguse:icons.svg#exclamation" color="red" size="md"
          />
          <div class="q-ml-sm  name">관리자 권한 수정</div>
        </div>
      </q-img>
    </q-card-section>
    <q-card-section>
      <div v-if="user.admin">
        <span class="name">{{ user.email }}</span> 사용자에게 관리자 권한을 <span class="name text-red">회수</span>하시겠습니까?
      </div>
      <div v-else class="q-pa-md" style="height: 8rem;">
        <span class="name">{{ user.email }}</span> 사용자에게 관리자 권한을 <span class="name text-red">부여</span>하시겠습니까?
      </div>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn padding=".3rem 2rem" flat rounded v-close-popup label="취소" />
      <q-btn class="q-mx-md" padding=".3rem 2rem" unelevated rounded color="cyan" @click="onSubmit" label="확인" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { ref, toRefs, inject } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'

export default {
  props: ['user'],
  setup (props, { emit }) {
    const { dispatch } = useStore()
    const { user } = toRefs(props)
    const $api = inject('$api')
    const $q = useQuasar()

    const error = ref('')

    const onSubmit = async () => {
      $q.loading.show()
      try {
        await $api.get(`/auth/users/admin?id=${user.value._id}&value=${!user.value.admin}`)
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
:deep(.q-img__image) {
  -webkit-filter: blur(4px);
  filter: blur(4px);
}
</style>
