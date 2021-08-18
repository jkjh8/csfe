<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="bg-white text-grey-10">
        <q-toolbar-title class="row items-center q-ml-md">
          <q-btn
            flat
            round
            color="teal-14"
            to="/"
          >
            <img
              alt="logo"
              src="~assets/icon_c_1.svg"
              style="width: 38px; height: 38px"
            />
          </q-btn>
          <!-- <div>서버</div> -->
        </q-toolbar-title>
        <span>
          <RouterAddress :user="user" :currentPath="currentPath" />
        </span>
        <span class="q-ml-sm" v-show="user">
          <Notice />
        </span>
        <UserStatus class="q-mx-xs" v-show="currentPath !== '/login'"></UserStatus>
      </q-toolbar>
      <q-separator color="grey-3" />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { defineComponent, computed, onBeforeMount, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { socket } from '../boot/socketio'
import RouterAddress from '../components/layout/routeLink'
import Notice from '../components/layout/notice.vue'
import UserStatus from '../components/layout/userStatus.vue'

export default defineComponent({
  name: 'MainLayout',
  // mixins: [clock, user],
  components: { RouterAddress, Notice, UserStatus },
  setup () {
    const store = useStore()
    const route = useRoute()

    const user = computed(() => store.state.user.user)
    const currentPath = computed(() => route.path)

    onBeforeMount(() => {
      socket.on('connect', () => {
        console.log('socket connected')
        store.commit('socket/connectState', true)
      })
      socket.on('disconnect', () => {
        console.log('socket disconnect')
        store.commit('socket/connectState', false)
      })
      socket.connect()
    })

    onBeforeUnmount(() => {
      socket.disconnect()
    })

    return { user, currentPath }
  }
})
</script>
