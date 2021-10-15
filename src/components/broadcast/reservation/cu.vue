<template>
  <q-dialog
    v-model="mdSchedule"
    persistent
  >
    <q-card class="card-nomal">
      <q-card-section class="q-pa-none">
        <div class="backg-gr-bl">
          <div class="card-name-align">
            <div class="card-name">
              <q-icon name="svguse:icons.svg#server" />
              <div>
                <div>
                  스케줄 생성 및 수정
                </div>
                <div class="caption">
                  스케줄을 생성하거나 수정합니다.
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <q-scroll-area style="height: 400px">
          <div class="q-mx-md q-gutter-md">
            <!-- uuid -->
            <div>
              <q-input
                v-model="id"
                dense
                filled
                label="ID"
              />
            </div>
            <!-- 반복 설정 -->
            <div>
              <q-select
                v-model="repeat"
                filled
                dense
                label="반복"
                :options="['한번', '매일', '매주']"
              />
            </div>
            <!-- 한번 매주 -->
            <div>
              <div v-if="repeat === '한번' || repeat === '매주'">
                <q-select
                  v-if="repeat ==='매주'"
                  v-model="week"
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
                  v-model="date"
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
                          v-model="date"
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
                          v-model="date"
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
              <div v-if="repeat === '매일'">
                <q-input
                  v-model="time"
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
                        <q-time v-model="time">
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

            <!-- 방송 모드 -->
            <div>
              <q-select
                v-model="mode"
                filled
                dense
                label="방송 모드"
                :options="['Media', 'TTS']"
              />
            </div>

            <!-- 방송 모드 상세 -->
            <!-- 오디오 비디오 파일 -->
            <div v-if="mode === 'Media'">
              <div v-if="file">
                <div class="listname">
                  선택된 파일은
                </div>

                <div>
                  <q-item>
                    <q-item-section avatar>
                      <div v-if="file.type === 'directory'">
                        <q-icon
                          name="svguse:icons.svg#folder-fill"
                          color="yellow"
                          size="md"
                        />
                      </div>
                      <div v-else-if="file.type === 'audio'">
                        <q-icon
                          name="svguse:icons.svg#music-note-fill"
                          color="grey"
                          size="sm"
                        />
                      </div>
                      <div v-else-if="file.type === 'video'">
                        <q-icon
                          name="svguse:icons.svg#video-camera-fill"
                          color="blue-grey"
                          size="sm"
                        />
                      </div>
                    </q-item-section>
                    <q-item-section>
                      {{ file.name }}
                    </q-item-section>
                    <q-item-section side>
                      <q-btn
                        round
                        flat
                        icon="play_arrow"
                        color="green"
                        @click="$store.dispatch('broadcast/startPreview',file)"
                      />
                    </q-item-section>
                  </q-item>
                </div>
              </div>
              <div>
                <q-btn
                  class="full-width"
                  rounded
                  color="primary"
                  unelevated
                  @click="mdSelectFile=!mdSelectFile"
                >
                  Select File
                </q-btn>
              </div>
            </div>
            <!-- TTS -->
            <div v-if="mode === 'TTS'">
              <TtsSet
                :id="id"
                ref="tts"
              />
            </div>
          </div>
        </q-scroll-area>
      </q-card-section>

      <q-card-actions align="right">
        <div class="q-gutter-md q-mr-sm">
          <q-btn
            v-close-popup
            label="취소"
          />
          <q-btn
            v-close-popup
            label="확인"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="mdSelectFile">
    <SelectFile @update="updateFile" />
  </q-dialog>
</template>

<script>
import { ref, computed, onUpdated } from 'vue'
import { useStore } from 'vuex'
import { uid } from 'quasar'

import moment from 'moment'

import SelectFile from '@components/broadcast/fileSelect'
import TtsSet from '@components/broadcast/ttsSet'

export default {
  components: { SelectFile, TtsSet },
  setup () {
    const { state, commit } = useStore ()
    const mdSchedule = computed({
      get () { return state.broadcast.mdSchedule},
      set (v) { return commit('broadcast/updateMdSchedule', v)}
    })
    const mdSelectFile = ref(false)
    const tts = ref(null)

    const id = ref('')
    const repeat = ref('한번')
    const time = ref('')
    const date = ref('')
    const week = ref(null)
    const mode = ref('Media')
    const file = ref(null)

    function updateFile(item) {
      console.log(file)
      file.value = item
      console.log(file.value)
      mdSelectFile.value = false
    }


    onUpdated(() => {
      id.value = uid()
      console.log('get id ', id.value)
      time.value = moment().format('hh:mm')
      date.value = moment().format('YYYY-MM-DD hh:mm')
    })


    return {
      mdSchedule,
      tts,
      id,
      repeat,
      time,
      date,
      week,
      mode,
      file,
      mdSelectFile,
      updateFile
    }
  }
}
</script>
