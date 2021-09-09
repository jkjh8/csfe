<template>
  <button class="menu">
    방송
    <q-menu
      class="row justify-center items-center text-white bg-black"
      style="width: 18rem; height: 3rem; border-radius: 2rem;"
      :offset="[110,5]"
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
      :offset="[75,5]"
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
</template>

<style scoped>
.menu {
  text-decoration: none;
  font-size: 1rem;
  font-family: 나눔고딕;
  font-weight: 700;
  border: none;
  color: #676767;
  background: #FBFBFB;
}
.menu:hover {
  font-size: 1rem;
  font-weight: 700;
  color: #111;
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
