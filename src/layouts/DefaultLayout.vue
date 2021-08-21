<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="text-grey-10" style="background: #fbfbfb; height: 4rem;">
        <q-toolbar-title class="row items-center q-ml-md">
          <q-icon name="svguse:icons.svg#logo-circle" size="3rem" @click="$router.push('/')" />
          <!-- <router-link class="q-ml-sm q-mb-xs" style="text-decoration: none;" to="/">
            <div style="font-family: branda; font-size:1rem; color: teal;">MS</div>
            <div style="font-size: .5rem; color: grey;">Media Server</div>
          </router-link> -->
          <!-- <div>서버</div> -->
        </q-toolbar-title>
        <span>
          <RouterAddress :user="user" :currentPath="currentPath" />
        </span>
        <span class="q-ml-sm" v-show="user">
          <Notice />
        </span>
        <!-- 로그인 메뉴 -->
        <span v-if="!user">
          <!-- <q-btn class="text-bold" style="font-family: nanumgothicbold;" outline padding=".5rem 1rem .5rem 1rem" label="로그인" /> -->
          <router-link class="q-mr-md text-bold text-grey-6" style="font-size: 1rem; text-decoration: none;" to="/login">Sign in</router-link>
          <q-btn color="cyan-7" unelevated no-caps to="/register">
            <div class="q-my-xs" style="font-size: 1rem;">Sign up</div>
          </q-btn>
        </span>
        <span v-else>
          <UserMenu />
        </span>
        <!-- <UserStatus class="q-mx-xs" v-show="currentPath !== '/login'"></UserStatus> -->
      </q-toolbar>
      <q-separator color="grey-3" />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { computed, onBeforeMount, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { socket } from '../boot/socketio'
import RouterAddress from '../components/layout/routeLink'
import Notice from '../components/layout/notice.vue'
import UserMenu from '../components/layout/user.vue'
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
</script>

<style>
.body--light {
  background: #fbfbfb;
}
</style>
