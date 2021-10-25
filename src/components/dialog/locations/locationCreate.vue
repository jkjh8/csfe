<template>
  <q-dialog
    ref="dialogRef"
    persistent
    @hide="onDialogHide"
  >
    <q-card
      class="q-dialog-plugin"
      style="border-radius: 1rem;"
    >
      <q-card-section class="bg-grey-1">
        <div class="row justify-between items-center">
          <div class="row items-center q-gutter-md">
            <q-avatar
              color="cyan-1"
              text-color="red"
              size="2.5rem"
            >
              <q-icon
                name="svguse:icons.svg#calendar"
                color="blue"
                size="1.5rem"
              />
            </q-avatar>
            <div>
              <div style="font-size: 1.2rem;">
                지역 추가 및 수정
              </div>
              <div class="caption">
                지역단위 혹은 본부 DSP 추가 및 설정
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      
      <q-card-section v-if="error">
        <div class="q-mx-md">
          <div class="error">
            {{ error }}
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="q-ma-md q-gutter-sm">
          <div>
            <q-input
              v-model="locate.index"
              dense
              type="number"
              filled
              label="Index"
            /> 
          </div>
          <div>
            <q-input
              v-model="locate.name"
              dense
              filled
              label="이름"
            />
          </div>
          <div>
            <q-select
              v-model="locate.devicetype"
              dense
              filled
              label="Device Type"
              :options="['Q-Sys', 'Barix']"
            />
          </div>
          <div>
            <q-select
              v-model="locate.ipaddress"
              dense
              filled
              :options="locate.devicetype === 'Q-Sys' ? qsysList:barixList"
              option-value="ipaddress"
              emit-value
              map-options
              label="Device"
            >
              <!-- seleted -->
              <template #selected-item="scope">
                <q-item
                  v-if="scope.opt.name"
                  dense
                >
                  <q-item-section avatar>
                    <q-icon
                      name="svguse:iconsColor.svg#pc"
                      size="xs"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ scope.opt.name }} - {{ scope.opt.ipaddress }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <span :class="scope.opt.devicetype === 'Q-Sys'? 'qsys':'barix'">
                      {{ scope.opt.type }}
                    </span>
                  </q-item-section>
                </q-item>
              </template>
              <!-- options -->
              <template #option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section avatar>
                    <q-icon
                      name="svguse:iconsColor.svg#pc"
                      size="xs"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ scope.opt.name }}</q-item-label>
                    <q-item-label caption>
                      {{ scope.opt.ipaddress }}
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <span :class="scope.opt.devicetype === 'Q-Sys'? 'qsys':'barix'">
                      {{ scope.opt.devicetype }}
                    </span>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </div>
      </q-card-section>

      <!-- buttons example -->
      <q-card-actions
        align="right"
        class="bg-grey-1"
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
            @click="onOKClick(locate)"
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

export default {
  props: {
    item: Object
  },

  emits: [
    ...useDialogPluginComponent.emits
  ],

  setup (props) {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
    const $q = useQuasar()
    const { getters } = useStore()

    const indexArr = computed(() => getters['locations/getLocationsIndexArr'])
    const qsysList = computed(() => getters['devices/QsysList'])
    const barixList = computed(() => getters['devices/BarixList'])

    const error = ref('')

    const locate = ref({
      index: 1,
      name: '',
      ipaddress: '',
      devicetype: 'Q-Sys'
    })

    function getIndex () {
      let index
      for (let i = 1; i <= indexArr.value.length + 1; i++) {
        if (!indexArr.value.includes(i)) {
          index = i
          break
        }
      }
      return index
    }

    onMounted(async() =>{
      if (!props.item) {
        locate.value.index = getIndex()
      } else {
        locate.value = { ...props.item }
      }
    })

    async function onOKClick (item) {
      $q.loading.show()
        try {
          if (item._id) {
            await api.put('/locations', item)
          } else {
            await api.post('/locations', item)
          }
           onDialogOK(item)
        } catch (err) {
          error.value = err.response.data.message
        }
        $q.loading.hide()
    }


    return {
      dialogRef,
      onDialogHide,
      error,
      locate,
      qsysList,
      barixList,
      onOKClick,
      onCancelClick: onDialogCancel
    }
  }
}
</script>

<style scoped>
.zones {
  padding: .5rem .5rem;
  margin: .5rem 0 .5rem 0;
  border-radius: .5rem;
  background: #f1f1f1;
}
.pickupColor {
  font-size: .5rem;
  height: 100%;
  margin: 5px 5px;
}
.pickBtn:hover {
  background: none;
}
.error {
  background: red;
  color: #fff;
  border-radius: 1rem;
  width: 100%;
  padding: .5rem .5rem;
  text-align: center;
}
</style>
