<template>
  <q-layout view="hHh Lpr lFf">
    <q-header class="text-black">
      <div class="row items-center" style="padding-top: 12px; text-align: center;">
        <router-link class="col-3 logo" to="/">
          Media Server
        </router-link>
        <div class="col-7 q-gutter-md">
          <LinkNormal :user="user" />
        </div>
        <div class="col-2">
          <UserStatus :user="user" />
        </div>
      </div>
    </q-header>

    <q-page-container>
      <router-view :user="user" />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref, onBeforeMount, onBeforeUnmount, computed } from 'vue'
import { useStore } from 'vuex'
// import { useRoute } from 'vue-router'
import { socket } from '../boot/socketio'
import LinkNormal from '../components/layout/linkNormal'
import UserStatus from '../components/layout/userStatus.vue'
// import RouterAddress from '../components/layout/routeLink'
// import Notice from '../components/layout/notice.vue'
// import UserMenu from '../components/layout/user.vue'
export default {
  components: { LinkNormal, UserStatus },
  setup () {
    const { state, commit, dispatch } = useStore()
    const brocastMenu = ref(false)
    const user = computed(() => state.user.user)
    onBeforeMount(() => {
      socket.on('connect', () => {
        console.log('socket connected')
        commit('socket/connectState', true)
      })
      socket.on('disconnect', () => {
        console.log('socket disconnect')
        commit('socket/connectState', false)
      })
      socket.on('devices', (devices) => {
        dispatch('devices/updateListAsWebsoket', devices)
      })
      socket.connect()
    })

    onBeforeUnmount(() => {
      socket.disconnect()
    })
    return {
      brocastMenu,
      user
    }
  }
}
// const route = useRoute()

// const user = computed(() => state.user.user)
// const currentPath = computed(() => route.path)

</script>

<style scoped>

.header {
  text-align: center;
  padding-top: 14px;
}
.logo {
  text-decoration: none;
  font-family: 다음체;
  font-weight: 700;
  font-size: 1.5rem;
  color: #111
}
</style>
