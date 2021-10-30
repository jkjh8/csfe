<template>
  <q-card class="card-large">
    <q-card-section class="q-pa-none">
      <div class="backg-dark">
        <div class="card-name-align q-px-md">
          <div class="card-name">
            <q-icon name="svguse:icons.svg#map" />
            <div>
              <div>지역설정</div>
              <div
                v-if="errorCount"
                class="caption"
              >
                현재 {{ errorCount }}개의 지역의 점검이 필요합니다
              </div>
            </div>
          </div>
          <div class="q-pa-none q-ma-none">
            <q-btn
              flat
              round
              color="cyan-7"
              icon="svguse:icons.svg#plus-circle-fill"
              @click="fnCreateItem"
            />
          </div>
        </div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section class="q-pa-none">
      <q-scroll-area
        visible
        style="height: 30rem"
      >
        <q-list>
          <q-item
            v-for="device in masters"
            :key="device.index"
            v-ripple
            class="q-px-lg"
            clickable
            :active="device === selected"
            active-class="active-link"
            @click="clickItem(device)"
          >
            <q-item-section avatar>
              <q-avatar
                style="border: 1px solid #454545"
                size="2rem"
              >
                {{ device.index }}
                <q-badge
                  v-if="!device.status"
                  color="red"
                  rounded
                  floating
                />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>
                <span class="listname">{{ device.name }}</span>
                <span
                  class="q-ml-sm"
                  :class="device.type === 'Q-Sys'? 'qsys':'barix'"
                >{{ device.type }}</span>
              </q-item-label>
              <q-item-label caption>
                {{ device.ipaddress }}
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <div>
                <q-btn
                  flat
                  round
                  icon="svguse:icons.svg#pencil-fill"
                  size="sm"
                  color="teal-6"
                  @click.prevent.stop="fnEdit(device)"
                />
                <q-btn
                  flat
                  round
                  icon="svguse:icons.svg#trash-fill"
                  size="sm"
                  color="red-6"
                  @click.prevent.stop="fnDelete(device)"
                />
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-card-section>
  </q-card>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'

// import CreateUpdate from './cu'
import createUpdate from '@components/dialog/devices/deviceAdd'
import deleteItemComponent from '@components/dialog/delete'

export default {
  setup () {
    const { state, getters, commit, dispatch } = useStore()
    const $q = useQuasar()

    const selected = computed(() => state.devices.selected)
    const masters = computed(() => getters['devices/getMaster'])
    const errorCount = computed(() => {
      const list = []
      masters.value.forEach(device => {
        if (!device.status) {
          list.push(device)
        }
      })
      return list.length
    })
    const createUpdateDialog = ref(false)
    const deleteDialog = ref(false)
    const selForEdit = ref({})

    function fnCreateItem () {
      $q.dialog({
        component: createUpdate
      }).onOk(async () => {
        $q.loading.show()
        await dispatch('devices/updateDevices')
        $q.loading.hide()
      })
    }

    function fnEdit (item) {
      $q.dialog({
        component: createUpdate,
        componentProps: { item: item }
      }).onOk(async () => {
        $q.loading.show()
        await dispatch('devices/updateDevices')
        $q.loading.hide()
      })
      // selForEdit.value = item
      // createUpdateDialog.value = true
    }

    function fnDelete (item) {
      $q.dialog({
        component: deleteItemComponent,
        componentProps: { item: item }
      }).onOk(async () => {
        $q.loading.show()
        await dispatch('devices/updateDevices')
        $q.loading.hide()
      })
    }

    function clickItem (item) {
      if (item === selected.value) {
        commit('devices/selected', null)
        // dispatch('devices/updateDevices', '')
      } else {
        commit('devices/selected', item)
        // dispatch('devices/updateDevices')
      }
    }

    return {
      masters,
      errorCount,
      createUpdateDialog,
      deleteDialog,
      selected,
      selForEdit,
      fnCreateItem,
      fnEdit,
      fnDelete,
      clickItem
    }
  }
}
</script>

<style scoped>
/* .active-link {
  background: #eaeaea;
  color: black;
}
:deep(.q-img__image) {
  -webkit-filter: blur(4px);
  filter: blur(4px);
} */
</style>
