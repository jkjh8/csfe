<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="text-black q-my-md" style="background: #FBFBFB; height:3rem;">
      <div class="row items-center header">
        <router-link
          class="col-3 logo"
          to="/"
        >
          Media Server
        </router-link>
        <div
          class="col-7 q-gutter-md"
        >
          <button class="menu">
            방송
            <q-menu
              class="row justify-center items-center text-white bg-black"
              style="width: 18rem; height: 3rem; border-radius: 2rem;"
              :offset=[110,5]
            >
              <div
                class="q-gutter-md row items-center link"
              >
                <router-link to=''>방송상태</router-link>
                <router-link to=''>실시간방송</router-link>
                <router-link to=''>예약방송</router-link>
              </div>
            </q-menu>
          </button>
          <button class="menu">
            방송구간
            <q-menu
              class="row justify-center items-center text-white bg-black"
              style="width: 15rem; height: 3rem; border-radius: 2rem;"
              :offset=[75,5]
            >
              <div
                class="q-gutter-md row items-center link"
              >
                <router-link to='/locations'>방송구간설정</router-link>
                <router-link to='/devices'>방송장비설정</router-link>
              </div>
            </q-menu>
          </button>
          <router-link class="menu" to="/eventlog">
            이벤트 로그
          </router-link>
        </div>
        <div
          class="col-2"
        >
          <q-btn flat rounded size="sm">로그인</q-btn>
        </div>
      </div>
      <!-- <q-toolbar class="row justify-between items-center" style="background: #fbfbfb; height: 4rem;">
        <q-toolbar-title>
          <q-icon name="img:logo-c.svg" size="3rem" @click="$router.push('/')"></q-icon>
        </q-toolbar-title>
        <span>
          <RouterAddress :user="user" :currentPath="currentPath" />
        </span>
        <span class="q-ml-sm" v-show="user">
          <Notice />
        </span>

        <span v-if="!user">
          <router-link class="q-mr-md text-bold text-grey-6" style="font-size: 1rem; text-decoration: none;" to="/login">Sign in</router-link>
          <q-btn color="cyan-7" unelevated no-caps to="/register">
            <div class="q-my-xs" style="font-size: 1rem;">Sign up</div>
          </q-btn>
        </span>
        <span v-else>
          <UserMenu />
        </span>
      </q-toolbar> -->
    </q-header>

    <q-page-container>
      <router-view class="q-pt-xl" />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref, onBeforeMount, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
// import { useRoute } from 'vue-router'
import { socket } from '../boot/socketio'
// import RouterAddress from '../components/layout/routeLink'
// import Notice from '../components/layout/notice.vue'
// import UserMenu from '../components/layout/user.vue'
export default {
  setup () {
    const { commit, dispatch } = useStore()
    const brocastMenu = ref(false)

    function offHover (id) {
      setTimeout(() => {
        console.log(id)
        id.value = false
      }, 1000)
    }
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
      offHover
    }
  }
}
// const route = useRoute()

// const user = computed(() => state.user.user)
// const currentPath = computed(() => route.path)

</script>

<style>
.body--light {
  background: #FBFBFB;
}
.header {
  text-align: center;
}
.logo {
  text-decoration: none;
  font-family: 다음체;
  font-weight: 700;
  font-size: 1.5rem;
  color: #111
}
.menu {
  text-decoration: none;
  font-size: 1rem;
  font-family: 나눔고딕;
  font-weight: 400;
  border: none;
  color: #111;
  background: #FBFBFB;
}
.menu:hover {
  font-size: 1.2rem;
  font-weight: 700;
}
.link a {
  color: #d0d0d0;
  font-family: 나눔고딕;
  font-weight: 400;
  font-size: .8rem;
  text-decoration: none;
}
.link a:hover {
  font-size: 1rem;
  color: #FFFFFF
}
</style>
