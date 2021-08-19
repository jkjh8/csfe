<template>
  <q-page class="row justify-end">
    <q-img
      alt="logo"
      src="~assets/img_5.jpg"
      fit="scover"
    >
      <div class="absolute-full text-subtitle2 flex flex-center column q-gutter-md">
        <div style="font-size: 3rem;">Media Server</div>
        <div>사용을 위해서 먼저 로그인 해주세요!</div>
        <div><q-btn class="loginBtn" flat label="로그인"></q-btn></div>
        <div><q-btn flat label="회원 가입" /></div>
      </div>
    </q-img>
  </q-page>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import getUser from '../apis/users'

export default defineComponent({
  name: 'PageIndex',
  setup () {
    // const { proxy } = getCurrentInstance()

    onMounted(() => {
      // proxy.$api.get('/auth/getUser').then((res) => {
      //   console.log(res)
      // })
      getUser()
    })
  }
})
</script>

<style scoped>
.loginBtn {
  border: 1px solid #ffffff;
  border-radius: .5rem;
}
</style>
