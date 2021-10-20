<template>
  <q-dialog
    ref="dialogRef"
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
                style="border-radius: 4px;"
              >
                <div class="q-mx-sm row self-center">
                  <div class="text-grey-8">
                    색상선택
                  </div>
                  <div
                    class="q-ml-md"
                    style="width: 2rem; height: 1.5rem;"
                    :style="`background: ${schedule.color}`"
                  />
                </div>
                <div>
                  <q-btn
                    round
                    unelevated
                    text-color="blue-10"
                    @click="fncolorPicker"
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
                <div>
                  <div class="listname">
                    선택된 지역은
                  </div>
                  <div class="zones">
                    <q-scroll-area style="height: 100px">
                      <q-tree
                        :nodes="schedule.zones"
                        node-key="_id"
                      >
                        <template #default-header="props">
                          <div>
                            <q-icon
                              name="svguse:icons.svg#map1"
                              size=".8rem"
                            />
                            <span class="q-ml-sm">{{ props.node.name }}</span>
                          </div>
                        </template>
                      </q-tree>
                    </q-scroll-area>
                  </div>
                </div>
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

          <div class="col-6 q-px-md">
            <div class="q-gutter-sm">
              <!-- 방송 모드 -->
              <div>
                <q-select
                  v-model="schedule.mode"
                  filled
                  dense
                  label="방송 모드"
                  :options="['Media', 'TTS']"
                />
              </div>

              <!-- 방송 모드 상세 -->
              <div>
                <div class="listname">
                  선택된 파일은
                </div>

                <div v-if="schedule.file">
                  <q-item>
                    <q-item-section avatar>
                      <div v-if="schedule.file.type === 'directory'">
                        <q-icon
                          name="svguse:icons.svg#folder-fill"
                          color="yellow"
                          size="md"
                        />
                      </div>
                      <div v-else-if="schedule.file.type === 'audio'">
                        <q-icon
                          name="svguse:icons.svg#music-note-fill"
                          color="grey"
                          size="sm"
                        />
                      </div>
                      <div v-else-if="schedule.file.type === 'video'">
                        <q-icon
                          name="svguse:icons.svg#video-camera-fill"
                          color="blue-grey"
                          size="sm"
                        />
                      </div>
                    </q-item-section>
                    <q-item-section>
                      {{ schedule.file.name }}
                    </q-item-section>
                    <q-item-section side>
                      <q-btn
                        round
                        flat
                        icon="play_arrow"
                        color="green"
                        @click="$store.dispatch('broadcast/startPreview',schedule.file)"
                      />
                    </q-item-section>
                  </q-item>
                </div>
                <div
                  v-else
                  class="text-grey text-center"
                  style="margin: 1rem 1rem;"
                >
                  선택된 파일이 없습니다.
                </div>
              </div>
              <!-- 오디오 비디오 파일 -->
              <div v-if="schedule.mode === 'Media'">
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
                    color="purple-1"
                    unelevated
                    @click="fnGetTtsAudio"
                  >
                    TTS 생성
                  </q-btn>
                </div>
              </div>
              <q-separator class="q-my-lg" />
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
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { uid } from 'quasar'
import moment from 'moment'

import Repeat from '@components/repeatSel'

import fileSelect from '@components/dialog/fileSelect'
import ttsCreate from '@components/dialog/ttsCreate'
import zoneSelect from '@components/dialog/zoneSelect'
import colorPicker from '@components/dialog/colorPicker'

export default {
  components: { Repeat },
  props: {
    item: Object
  },

  emits: [
    ...useDialogPluginComponent.emits
  ],

  setup (props) {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
    const { state } = useStore()
    const $q = useQuasar()

    const schedule = ref({
      id: '',
      name: '',
      repeat: '한번',
      time: '',
      date: '',
      week: null,
      mode: 'Media',
      file: null,
      tts: null,
      user_id: '',
      zones: [],
      selected: null,
      active: true,
      days: 1,
      color: '#00ffff',
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

    function fncolorPicker () {
      $q.dialog({
        component: colorPicker,
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

    onMounted(() =>{
      if (!props.item) {
        schedule.value.id = uid()
        schedule.value.time = moment().format('hh:mm')
        schedule.value.date = moment().format('YYYY-DD-MM')
        schedule.value.user_id = state.user.user.email
      } else {
        schedule.value = { ...props.item }
      }
    })


    return {
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

      onOKClick (item) {
        console.log(item)
        onDialogOK(item)
      },
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
</style>