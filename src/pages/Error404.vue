<template>
  <div
    class="fullscreen flex flex-center"
    style="height: 100%;"
  > 
    <q-card class="card-404 shadow-10">
      <q-card-section class="q-pa-none">
        <div class="backg-gr-te fit row items-center">
          <div class="fit row items-center q-gutter-md q-ml-md">
            <q-icon
              name="svguse:icons.svg#ban"
              color="grey-6"
              size="sm"
            />
            <div
              class="text-grey-6 logo"
              style="font-size: 1.5rem;"
            >
              Media Server
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="desc">
          <div class="text-h6 text-grey-6">
            404 ERROR
          </div>
          <div class="text-h4">
            Page Not Found
          </div>
          <div class="q-mt-lg">
            <router-link to="/">
              Home...
            </router-link>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Error404',
})
</script>

<style scoped>
.card-404 {
  width: 50%;
  min-width: 300px;
  border-radius: 2rem;
  overflow: hidden;
}
.desc {
  padding: 5% 5%;
  height: 100%;
  min-height: 200px;
}
</style>