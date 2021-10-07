<template>
  <q-dialog
    v-model="preview"
    seamless
    transition-hide="fade"
    transition-show="fade"
  >
    <q-card class="local-card-style">
      <q-btn
        v-close-popup
        class="close-btn"
        round
        icon="close"
      />
      <q-card-section class="q-pa-none">
        <div class="backg">
          <div class="local-name row items-center">
            {{ file.name }}
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <audio
          controls
          autoplay
          :src="source"
          @ended="onEnd"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  setup() {
    const { state, commit } = useStore()

    const preview = computed({
      get() {
        return state.broadcast.preview
      },
      set(value) {
        return commit('broadcast/setPreview', value)
      }
    })
    const file = computed(() => state.broadcast.previewFile)
    const source = computed(() => {
      let mediaPath
      if (process.env.DEV) {
        mediaPath = `http://${window.location.hostname}:3000`
      } else {
        mediaPath = `http://${window.location.hostname}`
      }
      if (file.value.src) {
        mediaPath = mediaPath + '/' + file.value.base + '/' + file.value.src
      } else {
        mediaPath = mediaPath + '/' + file.value.base + '/' + file.value.name
      }
      console.log(mediaPath)
      return mediaPath
    })

    function onEnd () {
      commit('broadcast/setPreview', false)
    }
    return {
      preview,
      file,
      source,
      onEnd
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
  font-size: 0.6rem;
  background: red;
  color: white;
  top: -0.5rem;
  right: -0.5rem;
  border: 4px solid rgba(255, 255, 255, 0.8);
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
  background: linear-gradient(
      127deg,
      rgba(255, 0, 0, 0.8),
      rgba(255, 0, 0, 0) 60.71%
    ),
    linear-gradient(227deg, rgba(0, 255, 0, 0.8), rgba(0, 255, 0, 0) 90.71%),
    linear-gradient(336deg, rgba(0, 0, 255, 0.8), rgba(0, 0, 255, 0) 99%);
}
.local-name {
  width: 100%;
  height: 100%;
  padding: 0 2rem;
  font-weight: 700;
}
</style>
