<template>
  <div class="fullscreen bg-grey-1 row justify-center items-center">
    <div
      class="shadow-15 row"
      style="border: 1px solid #edededed;
             border-radius: 2rem;
             width: 80%;
             height: 60%;
             background: white;
             overflow: hidden;
             z-index: 4;
             "
    >
      <div class="col-6">
          <div class="row q-gutter-sm items-center" style="padding: 1rem 1rem 0">
            <q-icon name="img:logo-c.svg" size="2rem"></q-icon>
            <div style="font-family: 다음체; font-size: 1.5rem; padding-top: 5px; color: #454545">Media Server</div>
          </div>
          <div class="full-height colume" style="padding: 30% 5%;">
            <div class="text-teal-14 q-ml-sm" style="font-family: 나눔스퀘어; font-weight: 700;">404 ERROR</div>
            <div class="text-h2 text-bold" style="font-family: 나눔고딕; font-weight: 800;">Page not found</div>
            <div class="text-grey q-mt-md q-ml-sm">죄송합니다. 페이지를 찾을 수 없습니다.</div>
            <div class="q-mt-lg">
              <a class="row items-center text-teal-14 q-ml-sm" href="/" style="text-decoration: none; font-family: 나눔고딕; font-weight: 700;">
                <q-icon name="fas fa-home"></q-icon>
                <span style="margin: 0 .5rem">홈으로...</span>
              </a>
            </div>
          </div>
        </div>
      <div class="col-6 image"></div>
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
