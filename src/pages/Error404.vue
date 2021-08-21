<template>
  <div class="fullscreen bg-grey-1 row justify-center items-center">
    <div
      class="row justify-start"
      style="border: 1px solid #edededed;
             border-radius: 1rem;
             width: 90%;
             height: 70%;
             background: white;
             overflow: hidden;
             z-index: 4;
             "
    >

      <div class="col-6">
        <div class="absolute full-height inline column justify-center q-ml-xl">
          <div class="absolute-top-left row q-gutter-md items-center q-mt-xl">
            <q-icon name="svguse:icons.svg#logo-circle" size="2rem"></q-icon>
            <div style="font-family: branda; font-size: 2rem;">Media Server</div>
          </div>
          <div>
            <div class="text-overline text-teal-14">404 ERROR</div>
            <div class="text-h2 text-bold" style="font-family: bebas">Page not found</div>
            <div class="text-grey">죄송합니다. 페이지를 찾을 수 없습니다.</div>
          </div>
          <div class="q-mt-lg">
            <a class="row items-center" href="/" style="text-decoration: none; font-family: nanumgothicbold; color: teal;">
              <q-icon name="fas fa-home"></q-icon>
              <span style="margin: 0 .5rem">홈으로...</span>
            </a>
          </div>
        </div>
      </div>
      <div class="col-6 image"></div>
      <!-- <div style="font-size: 10vh">
        404
      </div>

      <div class="text-h4" style="opacity:.4">
        앗. 페이지를 찾을 수 없습니다...
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="홈으로"
        no-caps
      /> -->
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Error404'
})
</script>

<style>
.image {
  background-image: url('../assets/background/404.jpg');
  background-size: cover;
}

</style>
