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

        <Link />
        <!-- <div><q-btn to="/login">Login</q-btn></div> -->
        <UserStatus class="q-mr-md"></UserStatus>
        <div>
          <q-btn
            class="bg-grey-9 text-grey-1"
            size="sm"
            rounded
            flat
            to="/login"
          >
            로그인
          </q-btn>
        </div>
      </q-toolbar>
      <q-separator color="grey-3" />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
// import clock from '../mixins/clock'
// import user from '../mixins/users'
// import UserStatus from '../components/users/loginState'
// import Link from '../components/Link'

export default {
  name: 'MainLayout'
  // mixins: [clock, user],
  // components: { UserStatus, Link },
  // created () {
  //   this.clock()
  // },
  // methods: {
  //   //
  // },
  // beforeDestroy () {
  //   this.logout()
  // }
}
</script>
