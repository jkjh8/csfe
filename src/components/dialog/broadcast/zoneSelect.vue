<template>
  <!-- notice dialogRef here -->
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
  >
    <q-card
      class="q-dialog-plugin"
      style="width: 800px; max-width: 1500px"
    >
      <!--
        ...content
        ... use q-card-section for it?
      -->
      <q-card-section class="bg-grey-1">
        <div class="row items-center q-gutter-md">
          <q-avatar
            color="yellow-1"
            size="2.5rem"
          >
            <q-icon
              name="svguse:icons.svg#map"
              color="orange"
              size="1.5rem"
            />
          </q-avatar>
          <div>
            <div style="font-size: 1.2rem">
              방송구간선택
            </div>
            <div>방송구간을 선택합니다.</div>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="q-mx-md q-mt-lg">
          <div class="row">
            <div class="col-6">
              <div class="q-mr-md row justify-between items-center">
                <div class="q-gutter-sm row listname">
                  <q-icon
                    name="svguse:iconsColor.svg#setup"
                    size="sm"
                  />
                  <span>방송구간 프리셋</span>
                </div>
                <div>
                  <q-btn
                    round
                    flat
                    icon="svguse:icons.svg#plus-circle"
                    size="sm"
                    color="green"
                    @click="fnAddPreset"
                  >
                    <q-tooltip
                      anchor="top middle"
                      self="bottom middle"
                      :offset="[0,10]"
                    >
                      프리셋 추가
                    </q-tooltip>
                  </q-btn>
                </div>
              </div>
              <div class="q-mt-sm">
                <q-list>
                  <q-item
                    v-for="preset in presets"
                    :key="preset._id"
                    v-ripple
                    style="height: 1rem;"
                    dense
                    clickable
                    active-class="active-class"
                    :active="preset === selectedPreset"
                    @click="fnUpdatePreset(preset)"
                  >
                    <q-item-section avatar>
                      <q-avatar>
                        <q-icon
                          :name="preset.type === 'Global' ? 'svguse:iconsColor.svg#global-color':'svguse:iconsColor.svg#private-color'"
                        />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>{{ preset.name }}</q-item-section>
                    <q-item-section side>
                      <div class="row">
                        <q-btn
                          icon="svguse:icons.svg#pencil-fill"
                          round
                          flat
                          size="sm"
                          color="cyan"
                          @click.stop.prevent="fnEdit(preset)"
                        />
                        <q-btn
                          icon="svguse:icons.svg#trash-fill"
                          round
                          flat
                          size="sm"
                          color="red"
                          @click.stop.prevent="fnDelete(preset)"
                        />
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>

            <div class="col-6">
              <div class="q-gutter-md column">
                <div class="q-gutter-sm listname row">
                  <q-icon
                    name="svguse:iconsColor.svg#mic-color"
                    size="sm"
                  />
                  <span>방송구간선택</span>
                </div>

                <div>
                  <q-scroll-area style="height: 320px">
                    <q-tree
                      v-model:seleted="selected"
                      v-model:ticked="ticked"
                      :nodes="devicesDetails"
                      tick-strategy="leaf"
                      node-key="ipaddress"
                      @update:ticked="selectedPreset = null"
                    >
                      <template #default-header="props">
                        <div>
                          {{ props.node.name }}
                        </div>
                      </template>
                    </q-tree>
                  </q-scroll-area>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>

      <!-- buttons example -->
      <q-card-actions
        class="bg-grey-1"
        align="right"
      >
        <div class="q-mx-sm q-gutter-sm">
          <q-btn
            label="취소"
            rounded
            unelevated
            @click="onCancelClick"
          />
          <q-btn
            color="primary"
            label="확인"
            unelevated
            rounded
            @click="onOKClick(ticked)"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useQuasar, useDialogPluginComponent } from 'quasar'
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

import { api } from '@/boot/axios'

// import ZonePreset from '@components/dialog/broadcast/zonePreset'
import Edit from '@components/dialog/broadcast/presetEdit'
import Delete from '@components/dialog/delete'
import Default from '@components/dialog/default'

export default {
  props: {
    item: Object
  },

  emits: [
    ...useDialogPluginComponent.emits
  ],

  setup() {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
    const { state, getters } = useStore()
    const selected = ref(null)
    const ticked = ref(null)
    const $q = useQuasar()

    const user = computed(() => state.user.user)
    const devices = computed(() => state.devices.devices)
    const devicesDetails = computed(() => getters['devices/mastersDetails'])
    const presets = ref(null)
    const selectedPreset = ref(null)

    function fnAddPreset () {
      $q.dialog({
        component: Edit,
        componentProps: { item: { user_id: user.value.email, zones: ticked.value } }
      }).onOk(async (item) => {
        const r = await api.post('/broadcast/preset', item)
        console.log(r)
        getPresets()
      })
    }

    function fnEdit(item) {
      if (item.type === 'Global' && !user.value.admin) {
        return $q.dialog({
          component: Default,
          componentProps: { message: '권한이 없습니다.'}
        })
      }
      $q.dialog({
        component: Edit,
        componentProps: { item: item }
      }).onOk(async (rt) => {
        await api.put('/broadcast/preset', rt)
        getPresets()
      })
    }

    function fnDelete (item) {
      console.log(item)
      if (item.type === 'Global' && !user.value.admin) {
        return $q.dialog({
          component: Default,
          componentProps: { message: '권한이 없습니다.'}
        })
      }

      $q.dialog({
        component: Delete,
        componentProps: { item: item }
      }).onOk(async (rt) => {
        const r = await api.get(`/broadcast/preset/delete?id=${rt._id}`)
        console.log(r)
        getPresets()
      })
    }

    function fnUpdatePreset (preset) {
      selectedPreset.value = preset
      ticked.value = preset.zones
      console.log(preset)
    }

    function fnGetZoneNames(zones) {
      const sel = []

      devices.value.forEach(locate => {
        // 지역확인
        if (zones.includes(locate.ipaddress) && locate.mode === 'Master') {
          sel.push({
            name: locate.name,
            ipaddress: locate.ipaddress,
            all: true,
            channels: [1]
          })
        } else {
          // 자식 확인
          const children = []
          const channels = []
          locate.children.forEach(child => {
            if (zones.includes(child.ipaddress)) {
              children.push({
                name: child.name,
                channel: child.channel
              })
              channels.push(child.channel)
            }
          })
          // 자식수 지역수 확인
          if (children.length) {
            sel.push({
              _id: locate._id,
              name: locate.name,
              location: locate._id,
              ipaddress: locate.ipaddress,
              all: children.length === locate.children.length ?? true,
              children: children.sort((a, b) =>  a.channel - b.channel),
              channels: channels.sort()
            })
          }
        }
      })
      return sel
    }

    async function getPresets () {
      const r = await api.get(`/broadcast/preset?user_id=${user.value.email}`)
      console.log(r.data)
      presets.value = r.data
    } 

    onMounted(async () => {
      await getPresets()      
    })

    return {
      user,
      selected,
      ticked,
      devices,
      devicesDetails,
      presets,
      selectedPreset,
      fnAddPreset,
      fnUpdatePreset,
      fnEdit,
      fnDelete,
      dialogRef,
      onDialogHide,
      onOKClick(items) {
        // on OK, it is REQUIRED to
        // call onDialogOK (with optional payload)
        onDialogOK({
          selected: items,
          zones: fnGetZoneNames(items)
        })
        // or with payload: onDialogOK({ ... })
        // ...and it will also hide the dialog automatically
      },

      // we can passthrough onDialogCancel directly
      onCancelClick: onDialogCancel
    }
  }
}
</script>

<style scoped>
.active-class {
  background: #91ECEC;
  color: #000;
  border-radius: .5rem;
}
</style>
