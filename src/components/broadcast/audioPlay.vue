<template>
  <q-card class="local-card-style">
    <q-btn
      class="close-btn"
      round
      icon="close"
      v-close-popup
    ></q-btn>
    <q-card-section class="q-pa-none">
      <div class="backg">
        <div class="local-name row items-center">
          {{ file.name }}
        </div>
      </div>
    </q-card-section>

    <q-card-section>
      <audio controls :src="source" />
    </q-card-section>

  </q-card>
</template>

<script>
import { computed } from 'vue'
export default {
  props: ['file'],
  setup (props) {
    const source = computed(() => {
      let r = `http://${window.location.hostname}:3000/media`
      if (props.file.src) {
        r = r + '/' + props.file.src
      }
      r = r + '/' + props.file.name
      return r
    })
    return {
      source
    }
  }
}
</script>

<style scoped>
.local-card-style {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  overflow: visible;
  width: 24rem;
  border-radius: 1rem;
  box-shadow: 0 0 2rem #999;
}
.close-btn {
  position: absolute;
  font-size: .6rem;
  background: red;
  color: white;
  top: -.5rem;
  right: -.5rem;
  border: 4px solid rgba(255, 255, 255, .8);
  z-index: 9999;
}
audio {
  width: 100%;
}
audio::-webkit-media-controls-enclosure {
    width: 100%;
    background-color: #fff;
}
.backg {
  border-radius: 1rem 1rem 0 0;
  height: 4rem;
  color: #fff;
  z-index: 1;
  background: linear-gradient(127deg, rgba(255,0,0,.8), rgba(255,0,0,0) 60.71%),
              linear-gradient(227deg, rgba(0,255,0,.8), rgba(0,255,0,0) 90.71%),
              linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 99%);
}
.local-name {
  width: 100%;
  height: 100%;
  padding: 0 2rem;
  font-weight: 700;
}
</style>
