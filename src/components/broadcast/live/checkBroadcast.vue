<template>
  <div id="zones">
    <div class="line_top" />
    <div class="modeZones">
      <div>
        <q-icon
          name="svguse:icons.svg#mic"
          color="yellow-5"
          size="3rem"
        />
        <span>
          방송 모드는 {{ mode }} 입니다.
        </span>
      </div>
      <div class="q-mt-xl">
        <div>
          <q-avatar
            round
            style="border: solid 4px #aaa; overflow:hidden;"
          >
            <q-icon
              name="svguse:icons.svg#server"
              size="xl"
            />
          </q-avatar>
          <span class="q-ml-md">선택된 방송구간은</span>
        </div>
        <q-scroll-area style="height: 10rem;">
          <q-tree
            color="grey"
            class="tree_font"
            :nodes="zones"
            node-key="_id"
            label-key="name"
          />
        </q-scroll-area>
      </div>
    </div>
    <div />
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  setup () {
    const { state, getters } = useStore()
    const mode = computed(() => state.broadcast.liveMode)
    const zones = computed(() => getters['locations/selectedGroup'])

    return {
      mode,
      zones
    }
  }
  
}
</script>

<style scoped>
#zones {
  position: relative;
  width: 30rem;
  padding: 2rem 2rem;
  color: #eee;
}
.modeZones {
  position: relative;
  vertical-align: middle;
  font-family: 나눔스퀘어;
  font-weight: 700;
  font-size: 2rem;
  z-index: 999;
}
.line_top {
  position: relative;
  top: 2rem;
  left: -1rem;
  height: 4rem;
  width: 2rem;
  background: rgba(0, 255, 255, 0.5);
  transform: rotate(45deg);
  border-radius: 1rem;
}
.line_bottom {
  position: relative;
  top: -2.5rem;
  left: 24rem;
  height: 4rem;
  width: 2rem;
  background: rgba(255, 255, 0, 0.5);;
  transform: rotate(45deg);
  border-radius: 1rem;
}
.tree_font {
  font-size: 1rem;
}
</style>
