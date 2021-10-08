<template>
  <q-card
    class="card-small"
    style="border-radius: 1rem;"
  >
    <q-card-section class="q-pa-none">
      <div class="backg-gr-bl">
        <div class="card-name-align">
          <div class="card-name">
            <q-icon
              name="svguse:icons.svg#view-grid-add"
              size="1.5rem"
            />
            <div class="q-ml-sm">
              <div class="name">
                프리셋 추가
              </div>
              <div class="caption">
                방송구간 프리셋을 추가 합니다
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="q-pa-md q-mr-sm q-gutter-md">
        <!-- 선택구간 트리 -->
        <div class="q-gutter-sm">
          <div class="listname">
            Selected
          </div>
          <div v-if="group && group.length">
            <q-tree
              :nodes="group"
              node-key="_id"
            >
              <template #default-header="props">
                <div>
                  {{ props.node.name }}
                </div>
              </template>
            </q-tree>
          </div>
          <div
            v-else
            style="text-align: center;"
          >
            <span class="text-red">선택된 방송 구간이 없습니다</span>
          </div>
        </div>
        <!-- 모드 이름 -->
        <div class="q-gutter-sm">
          <div class="listname">
            Mode
          </div>
          <div class="q-gutter-md">
            <q-option-group
              v-model="mode"
              :options="[
                { label: 'Global', value: 'global' },
                { label: 'Private', value: 'private' }
              ]"
              color="primary"
              inline
            />
          </div>
        </div>
        <div class="q-gutter-sm">
          <div class="listname">
            Name
          </div>
          <q-input
            v-model="name"
            dense
            outlined
          />
        </div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions align="right">
      <div class="q-mx-sm q-gutter-sm row items-center">
        <q-btn
          v-close-popup
          style="width: 6rem; height: 2rem"
          flat
          rounded
        >
          취소
        </q-btn>
        <q-btn
          style="width: 6rem; height: 2rem"
          unelevated
          rounded
          color="blue-grey-8"
          :disable="!group || !group.length"
          @click="onSubmit"
        >
          확인
        </q-btn>
      </div>
    </q-card-actions>
  </q-card>
</template>

<script>
import { ref, toRefs, computed } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'
import { api } from '@/boot/axios'

export default {
  props: {
    group: Object,
    selected: Object
  },
  emits: ['close'],
  setup (props, { emit }) {
    const { state } = useStore()
    const $q = useQuasar()
    const { group, selected } = toRefs(props)
    const user = computed(() => state.user.user)
    const mode = ref('global')
    const name = ref('')
    const zones = ref('')

    async function onSubmit () {
      $q.loading.show()
      try {
        const r = await api.post('/broadcast/preset', {
          user_id: user.value.email,
          name: name.value,
          type: mode.value,
          zones_id: selected.value,
          zones: group.value
        })
        console.log(r)
        emit('close')
      } catch (err) {
        emit('close')
      }
      $q.loading.hide()
    }

    return {
      mode,
      name,
      zones,
      onSubmit
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
