<template>
  <q-dialog
    ref="dialogRef"
    persistent
    @hide="onDialogHide"
  >
    <q-card
      class="q-dialog-plugin"
      style="width: 800px; max-width: 1600px;"
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
                스케쥴 생성 및 수정
              </div>
              <div class="caption">
                새로운 스케줄을 추가 하거나 수정 합니다.
              </div>
            </div>
          </div>

          <div>
            <q-btn
              round
              flat
              :icon="schedule.active ? 'svguse:icons.svg#check-circle':'svguse:icons.svg#ban'"
              :color="schedule.active ? 'green':'red'"
              @click="schedule.active=!schedule.active"
            />
          </div>
        </div>
      </q-card-section>

      <q-card-section
        v-if="error"
        class="bg-red"
        style="border-radius: .5rem"
      >
        <div>
          {{ error }}
        </div>
      </q-card-section>

      <q-card-section>
        <div class="row q-mt-md">
          <div class="col-6 q-px-md">
            <div class="q-gutter-sm">
              <div>
                <q-input
                  v-model="schedule.name"
                  dense
                  filled
                  label="예약명"
                />
              </div>
              <div
                class="row justify-between q-items-center bg-grey-3"
                style="border-radius: 4px; height: 2.5rem;"
              >
                <div class="q-mx-sm row self-center">
                  <div class="text-grey-8 pickupColor">
                    색상선택
                  </div>
                  <div
                    class="q-ml-md"
                    style="width: 4rem; height: 1.5rem; border-radius: 4px;"
                    :style="`background: ${schedule.color}`"
                    @click="fncolorPicker(schedule.color)"
                  />
                </div>
                <div class="row items-center q-mr-sm">
                  <q-btn
                    round
                    unelevated
                    size="sm"
                    @click="fncolorPicker(schedule.color)"
                  > 
                    <q-icon
                      name="colorize"
                      size="sm"
                      color="grey-8"
                    />
                  </q-btn>
                </div>
              </div>

              <Repeat
                :items="schedule"
                @updateRepeat="toRepeat"
                @updateWeek="toWeeks"
                @updateDate="toDate"
                @updateTime="toTime"
              />

              <q-separator />
              <!-- 지역 선택 -->
              <div>
                <div class="q-my-sm">
                  <SelectedZones
                    :nodes="schedule.zones"
                    :selected="schedule.selected"
                    :height="100"
                  />
                </div>
                <div>
                  <q-btn
                    class="full-width"
                    rounded
                    unelevated
                    color="blue-1"
                    text-color="grey-10"
                    @click="fnZoneSelect"
                  >
                    <q-icon
                      name="svguse:icons.svg#map"
                      size="xs"
                    />
                    <span class="q-ml-sm">지역선택</span>
                  </q-btn>
                </div>
              </div>
            </div>
          </div>

          <!-- 우측 -->
          <div class="col-6 q-px-md q-gutter-sm">
            <div>
              <q-select
                v-model="schedule.mode"
                filled
                dense
                :options="['Media', 'TTS']"
              />
            </div>
            <SelectedFile :file="schedule.file" />
            <div
              v-if="schedule.mode === 'Media'"
            >
              <div>
                <q-btn
                  class="full-width"
                  rounded
                  color="blue-1"
                  text-color="grey-10"
                  unelevated
                  @click="fnGetFile"
                >
                  <q-icon
                    name="svguse:icons.svg#archive"
                    size="xs"
                  />
                  <span class="q-ml-sm">파일선택</span>
                </q-btn>
              </div>
            </div>

            <div v-if="schedule.mode === 'TTS'">
              <div>
                <q-btn
                  class="full-width"
                  rounded
                  color="teal-1"
                  text-color="grey-10"
                  unelevated
                  @click="fnGetTtsAudio"
                >
                  <q-icon
                    name="svguse:icons.svg#mic"
                    size="xs"
                  />
                  <span class="q-ml-sm">TTS 생성</span>
                </q-btn>
              </div>
            </div>

            <q-separator />
            
            <!-- 상세 설명 -->
            <div>
              <q-input
                v-model="schedule.description"
                type="textarea"
                filled
                label="상세설명"
              />
            </div>
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
            @click="onOKClick(schedule)"
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
import { uid } from 'quasar'
import moment from 'moment'

import Repeat from '@components/repeatSel'

import fileSelect from '@components/dialog/broadcast/fileSelect'
import ttsCreate from '@components/dialog/broadcast/ttsCreate'
import zoneSelect from '@components/dialog/broadcast/zoneSelect'
import colorPicker from '@components/dialog/colorPicker'

import SelectedZones from '@components/broadcast/components/selectedZones'
import SelectedFile from '@components/broadcast/components/selectedFile'

export default {
  components: { Repeat, SelectedZones, SelectedFile },
  props: {
    item: Object,
    date: String
  },

  emits: [
    ...useDialogPluginComponent.emits
  ],

  setup (props) {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
    const { state } = useStore()
    const $q = useQuasar()

    const user = computed(() => state.user.user)
    const error = ref('')

    const schedule = ref({
      id: uid(),
      name: '',
      repeat: '한번',
      time: moment().format('hh:mm'),
      date: moment().format('YYYY-MM-DD'),
      week: null,
      mode: 'Media',
      file: null,
      tts: null,
      user_id: '',
      zones: [],
      selected: null,
      active: true,
      days: 1,
      color: user.value.color,
      description: '',
      dateData: ''
    })

    function fnGetFile () {
      $q.dialog({
        component: fileSelect
      }).onOk((file) => {
        schedule.value.file = file
      })
    }

    function fnGetTtsAudio() {
      $q.dialog({
        component: ttsCreate,
        componentProps: { item: schedule.value }
      }).onOk((rt) => {
        console.log(rt)
      })
    }

    function fnZoneSelect () {
      $q.dialog({
        component: zoneSelect
      }).onOk((rt) => {
        console.log(rt)
        schedule.value.zones = rt.zones
        schedule.value.selected = rt.selected
      })
    }

    function fncolorPicker (color) {
      $q.dialog({
        component: colorPicker,
        componentProps: { color: color }
      }).onOk((color) => {
        console.log(color)
        schedule.value.color = color
      })
    }

    function toRepeat (value) {
      schedule.value.repeat = value
      console.log('repeat', value)
    }
    
    function toWeeks (value) {
      schedule.value.week = value
    }

    function toDate (value) {
      schedule.value.date = value
      schedule.value.dateData = Date.parse(value)
      console.log('update date')
    }

    function toTime (value) {
      schedule.value.time = value
    }

    function onOKClick(item) {
      if (!item.name) return error.value = '이름을 입력해주세요'
      if (!item.file) return error.value = '재생할 파일을 선택해주세요'
      if (!item.zones.length) return error.value = '방송구간을 선택해주세요'
      onDialogOK(item)
    }

    onMounted(() =>{
      if (!props.item) {
        schedule.value.id = uid()
        schedule.value.time = moment().format('hh:mm')
        schedule.value.user_id = state.user.user.email
      } else {
        schedule.value = { ...props.item }
      }
      if (props.date) {
        console.log(props.date)
        schedule.value.date = props.date
      }
    })


    return {
      error,
      dialogRef,
      onDialogHide,
      schedule,
      fnGetFile,
      fnGetTtsAudio,
      fnZoneSelect,
      fncolorPicker,
      toRepeat,
      toWeeks,
      toDate,
      toTime,
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
</style>