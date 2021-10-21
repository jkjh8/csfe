<template>
  <div
    class="fit column wrap"
    style="padding: 5% 10%"
  >
    <Today />
    <div class="row justify-center q-pt-lg">
      <NeedLogin v-if="!user" />
    </div>
    <div
      v-if="user"
      class="q-gutter-lg row"
    >
      <InfoHardware />
      <InfoLocations />
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'
import moment from 'moment'

import Today from '../components/today.vue'
import NeedLogin from '../components/needLogin.vue'

import InfoLocations from '@components/info/locations'
import InfoHardware from '@components/info/hardware'

export default {
  components: {
    Today,
    NeedLogin,
    InfoLocations,
    InfoHardware
  },
  setup() {
    const { state, dispatch } = useStore()
    const $q = useQuasar()
    const user = computed(() => state.user.user)
    const today = ref('')
    moment.locale('ko')

    onMounted(async () => {
      $q.loading.show()
      await dispatch('user/getUser')
      today.value = moment().format('MM월 DD일 dddd')
      $q.loading.hide()
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
