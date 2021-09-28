<template>
  <div
    class="fit column wrap"
    style="padding: 5% 10%"
  >
    <Today />
    <div class="row justify-center q-pt-lg">
      <NeedLogin v-if="!user" />
    </div>
    <div>
      <InfoLocations />
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import moment from 'moment'

import Today from '../components/today.vue'
import NeedLogin from '../components/needLogin.vue'

import InfoLocations from '@components/info/locations' 

export default {
  components: {
    Today,
    NeedLogin,
    InfoLocations
  },
  setup() {
    const { state, dispatch } = useStore()
    const user = computed(() => state.user.user)
    const today = ref('')
    moment.locale('ko')

    onMounted(() => {
      dispatch('user/getUser')
      today.value = moment().format('MM월 DD일 dddd')
    })
    return {
      user,
      today
    }
  }
}
</script>
<style scoped>
.login {
  position: relative;
  width: 400px;
  height: 20vh;
  font-weight: 700;
  border-radius: 2rem;
  font-family: 나눔고딕;
  font-size: 1rem;
  word-break: break-all;
}
</style>
