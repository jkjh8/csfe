<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
  >
    <q-card class="q-dialog-plugin">
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
        <q-scroll-area style="height: 26rem;">
          <div class="q-mx-md q-mt-lg q-gutter-sm">
            <div>
              <q-input
                v-model="schedule.id"
                dense
                filled
                label="ID"
              />
            </div>

            <div>
              <q-input
                v-model="schedule.name"
                dense
                filled
                label="예약명"
              />
            </div>

            <div>
              <q-select
                v-model="schedule.repeat"
                filled
                dense
                label="반복"
                :options="['한번', '매일', '매주']"
              />
            </div>
            <div>
              <div v-if="schedule.repeat === '한번'">
                <q-input
                  v-model="schedule.date"
                  filled
                  dense
                  label="날짜 및 시간"
                >
                  <template #prepend>
                    <q-icon
                      name="event"
                      class="cursor-pointer"
                    >
                      <q-popup-proxy
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="schedule.date"
                          mask="YYYY-MM-DD HH:mm"
                        >
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>

                  <template #append>
                    <q-icon
                      name="access_time"
                      class="cursor-pointer"
                    >
                      <q-popup-proxy
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time
                          v-model="schedule.date"
                          mask="YYYY-MM-DD HH:mm"
                          format24h
                        >
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <!-- 매일 -->
              <div v-if="schedule.repeat === '매일' || schedule.repeat === '매주'">
                <q-select
                  v-if="schedule.repeat ==='매주'"
                  v-model="schedule.week"
                  class="q-my-md"
                  filled
                  dense
                  multiple
                  use-chips
                  stack-label
                  label="요일 선택"
                  :options="['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일']"
                />
                <q-input
                  v-model="schedule.time"
                  filled
                  dense
                  mask="time"
                  label="시간선택"
                  :rules="['time']"
                >
                  <template #append>
                    <q-icon
                      name="access_time"
                      class="cursor-pointer"
                    >
                      <q-popup-proxy
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time v-model="schedule.time">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>

            <!-- 지역 선택 -->
            <div>
              <div v-if="schedule.zones">
                <div class="listname">
                  선택된 지역은
                </div>
                <div class="zones">
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
            <!-- 오디오 비디오 파일 -->
            <div v-if="schedule.mode === 'Media'">
              <div v-if="schedule.file">
                <div class="listname">
                  선택된 파일은
                </div>

                <div>
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
              </div>
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
          </div>
        </q-scroll-area>
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

import fileSelect from '@components/dialog/fileSelect'
import ttsCreate from '@components/dialog/ttsCreate'
import zoneSelect from '@components/dialog/zoneSelect'

export default {
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
      zones: null,
      selected: null,
      active: true
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

    onMounted(() =>{
      if (!props.item) {
        schedule.value.id = uid()
        schedule.value.time = moment().format('hh:mm')
        schedule.value.date = moment().format('YYYY-DD-MM hh:mm')
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

      onOKClick (item) {
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