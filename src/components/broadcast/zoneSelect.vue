<template>
  <q-card class="shadow-15 location_card" style="width: 24rem;">
    <q-card-section class="q-pa-none">
      <q-img src="/background/cover_1.jpg" style="height: 6rem">
        <div class="fit row items-center justify-between">
          <div class="q-ml-sm row items-center">
            <q-icon name="svguse:icons.svg#view-grid-add" size="1.5rem"></q-icon>
            <div class="q-ml-sm">
              <div class="name">방송구간선택</div>
              <div class="caption">총 {{ selected.length }}개의 방송구간이 선택되었습니다.</div>
            </div>
          </div>
          <q-btn
            rounded label="preset"
            style="opacity: .9"
            :color="mode ? 'orange-10':'grey-5'"
            @click="mode = !mode"
          >
          </q-btn>
        </div>
      </q-img>
    </q-card-section>
    <q-card-section class="q-px-none">
      <q-scroll-area style="height: 24rem;">
        <q-tab-panels v-model="panel" animated>
          <q-tab-panel name="tree">
            <Tree :locations="locations" />
          </q-tab-panel>

          <q-tab-panel name="preset">
            <Preset />
          </q-tab-panel>
        </q-tab-panels>
      </q-scroll-area>
    </q-card-section>
    <q-separator />
    <q-card-actions align="right">
      <div class="q-px-md q-gutter-md row items-center" style="height: 4rem;">
        <q-btn
          style="width: 6rem; height: 2rem;"
          flat rounded
          @click="clear"
        >
          초기화
        </q-btn>
        <q-btn
          style="width: 6rem; height: 2rem;"
          unelevated rounded color="dark"
          @click="add = !add"
        >
          프리셋등록
        </q-btn>
        <!-- <q-btn style="width: 6rem; height: 2rem;" rounded>확인</q-btn> -->
      </div>
    </q-card-actions>
  </q-card>
  <q-dialog v-model="add">
    <PresetAdd :group="group" :selected="selected" @close="add=!add" />
  </q-dialog>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

import PresetAdd from '@components/broadcast/presetAddPopup'
import Tree from './select/broadcastTree.vue'
import Preset from './select/preset'

export default {
  components: { Tree, Preset, PresetAdd },
  props: ['locations'],
  setup (props) {
    const { state, getters, commit } = useStore()
    const selected = computed({
      get () { return state.locations.selectedId },
      set (value) {
        commit('locations/updateSelectedId', value)
        commit('locations/updateSelectedZonePreset', null)
      }
    })
    const group = computed(() => getters['locations/selectedGroup'])
    const add = ref(false)
    const mode = ref(false)
    const panel = computed(() => {
      if (mode.value) {
        return 'preset'
      } else {
        return 'tree'
      }
    })

    function clear () {
      commit('locations/updateSelectedId', [])
      commit('locations/updateSelectedZonePreset', null)
    }

    return {
      selected,
      group,
      clear,
      mode,
      add,
      panel
    }
  }
}
</script>

<style scoped>
.selected {
  border-radius: 1rem;
  padding: .5rem 1rem;
  font-weight: 600;
  background: linear-gradient(160deg, #fffec8, #fffec7)
}
:deep(.q-img__image) {
  -webkit-filter: blur(4px);
  filter: blur(4px);
}
</style>
