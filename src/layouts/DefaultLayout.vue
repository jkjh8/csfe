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
              src="~assets/logo_bk.svg"
              style="width: 38px; height: 38px"
            />
          </q-btn>
          <!-- <div>서버</div> -->
        </q-toolbar-title>
        <span v-if="user">
          <Links v-if="user" class="q-mx-md" />
          <Notice />
        </span>
        <UserStatus></UserStatus>
      </q-toolbar>
      <q-separator color="grey-3" />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
// import clock from '../mixins/clock'
// import user from '../mixins/users'
// import UserStatus from '../components/users/loginState'
import Links from '../components/layout/Links'
import Notice from '../components/layout/notice.vue'
import UserStatus from '../components/layout/userStatus.vue'

export default defineComponent({
  name: 'MainLayout',
  // mixins: [clock, user],
  components: { Links, Notice, UserStatus },
  setup () {
    const store = useStore()

    const user = computed(() => store.state.user.user)

    return { user }
  }
})
</script>
