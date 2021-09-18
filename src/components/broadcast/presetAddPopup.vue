<template>
  <q-card style="
    width: 24rem;
    border-radius: 2rem;
  ">
    <q-card-section class="backg">
      <div class="q-ml-md row items-center">
        <q-icon name="svguse:icons.svg#view-grid-add" size="1.5rem" />
        <div class="q-ml-sm">
          <div class="name">프리셋 추가</div>
          <div class="caption">방송구간 프리셋을 추가 합니다</div>
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="q-pa-md q-mr-sm q-gutter-md">
        <!-- 선택구간 트리 -->
        <div class="q-gutter-sm">
          <div class="listname">Selected</div>
          <div v-if="group && group.length">
            <q-tree
              :nodes="group"
              node-key="_id"
            >
              <template v-slot:default-header="props">
                <div>
                  {{ props.node.name }}
                </div>
              </template>
            </q-tree>
          </div>
          <div v-else style="text-align: center;">
            <span class="text-red">선택된 방송 구간이 없습니다</span>
          </div>
        </div>
        <!-- 모드 이름 -->
        <div class="q-gutter-sm">
          <div class="listname">Mode</div>
          <div class="q-gutter-md">
            <q-radio v-model="mode" val="global" label="글로벌 프리셋" />
            <q-radio v-model="mode" val="private" label="개인 프리셋" />
          </div>
        </div>
        <div class="q-gutter-sm">
          <div class="listname">Name</div>
          <q-input dense outlined v-model="name" />
        </div>
      </div>
    </q-card-section>
    <q-card-actions align="right">
      <div class="q-mx-sm q-mb-sm q-gutter-sm">
        <q-btn
          style="width: 6rem; height: 2rem"
          flat rounded v-close-popup
        >
          취소
        </q-btn>
        <q-btn
          style="width: 6rem; height: 2rem"
          unelevated rounded color="blue-grey-8"
          :disable="!group || !group.length"
        >
          확인
        </q-btn>
      </div>
    </q-card-actions>
  </q-card>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  props: ['group'],
  setup (props) {
    const { state } = useStore()
    const user = computed(() => state.user.user)
    const mode = ref('global')
    const name = ref('')
    const zones = ref('')

    console.log(user.value)
    return {
      mode,
      name,
      zones
    }
  }
}
</script>

<style scoped>
.backg {
  color: white;
  height: 5rem;
  background: linear-gradient(75deg, rgb(13, 96, 134), rgb(1, 27, 48))
}
.tree {
  background: #999;
}
</style>
