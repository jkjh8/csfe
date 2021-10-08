<template>
  <q-card
    class="card-large"
    style="max-width: 1200px;width: 800px;"
  >
    <q-card-section class="q-pa-none">
      <div class="backg-gr-bl">
        <div class="card-name-align">
          <div class="card-name">
            <q-icon
              class="q-ml-md"
              name="list"
              color="yellow-5"
              size="md"
            />
            <div class="q-ml-md">
              <div class="name">
                파일선택
              </div>
              <div class="caption">
                텍스트 파일을 선택하세요
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-card-section>

    <!-- 메시지 -->
    <q-card-section>
      <div class="fit row">
        <!-- 왼쪽창 -->
        <div
          style="width: 45%;"
        >
          <div class="listname">
            메시지를 선택하세요
          </div>
          <q-scroll-area style="height: 24rem;">
            <q-list>
              <q-item
                v-for="msg in messages"
                :key="msg._id"
                v-ripple
                class="q-mr-md"
                clickable
                :active="msg === selectedMessage"
                active-class="active-link"
                @click="selectedMessage=msg"
              >
                <q-item-section avatar>
                  <q-icon name="list_alt" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>
                    {{ msg.name }}
                  </q-item-label>
                  <q-item-label caption>
                    {{ msg.type }}
                  </q-item-label>
                </q-item-section>

                <q-item-section side>
                  <div class="row">
                    <q-btn
                      flat
                      round
                      size="sm"
                      color="green"
                      icon="edit"
                      @click.stop.prevent="fnSelectMessage(msg)"
                    />
                    <q-btn
                      flat
                      round
                      size="sm"
                      color="red"
                      icon="delete"
                      @click.stop.prevent="fnDeleteMsg(msg)"
                    />
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>
        </div>
        
        <q-separator vertical />

        <!-- 오른쪽창 -->
        <div
          class="q-ml-md"
          style="width: 50%;"
        >
          <div
            v-if="error"
            class="errorMsg"
          >
            {{ error }}
          </div>
          <div class="text-grey q-mt-md q-mx-sm row justify-between items-center">
            <div>
              Mode
            </div>
            <q-option-group
              v-model="message.type"
              :options="[
                { label: 'Global', value: 'global' },
                { label: 'Private', value: 'private' }
              ]"
              color="primary"
              inline
            />
          </div>

          <div class="q-mx-sm">
            <q-input
              v-model="message.name"
              dense
              label="Name"
            />
          </div>
          <!-- voice -->
          <div class="q-mt-md q-mx-sm">
            <q-select
              v-model="message.voice"
              :options="voices"
              option-label="name"
              :display-value="message.voice ? `${message.voice.name} - ${message.voice.languages}`: 'None'"
              emit-value
              map-options
              dense
              label="Voices"
            >
              <template #option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section avatar>
                    <q-icon
                      name="mic"
                      color="green"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>
                      {{ scope.opt.name }}
                    </q-item-label>
                    <q-item-label caption>
                      {{ scope.opt.languages.toString(',') }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <!-- rate -->
          <div class="q-mt-sm q-mx-sm row justify-between items-center">
            <div class="text-grey">
              Rate
            </div>
            <q-slider
              v-model="message.rate"
              style="width: 90%;"
              label
              :min="100"
              :max="300"
            />
          </div>
          <div
            class="q-mt-sm q-mx-sm"
            style="height: 170px;"
          >
            <q-input
              v-model="message.text"
              filled
              type="textarea"
              label="Message"
            />
          </div>
          <div class="row justify-end">
            <q-btn
              rounded
              unelevated
              label="미리듣기"
              @click="ttsPreview"
            />
            <q-btn
              class="q-ml-md"
              rounded
              unelevated
              :disabled="!message._id"
              color="purple"
              label="수정하기"
              @click="fnEditMessage"
            />
            <q-btn
              class="q-ml-md"
              rounded
              unelevated
              color="primary"
              label="저장하기"
              @click="fnSaveMessage"
            />
          </div>
        </div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions align="right">
      <q-btn
        v-close-popup
        style="width: 6rem; height: 2rem;"
        rounded
        flat
        no-caps
        label="닫기"
      />
      <q-btn
        v-close-popup
        :disable="!selectedMessage"
        class="q-mx-sm"
        style="width: 6rem; height: 2rem;"
        rounded
        unelevated
        color="primary"
        no-caps
        label="선택"
        @click="fnSelect"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useStore } from 'vuex'
import { api } from '@/boot/axios'

export default {
  setup () {
    const { state, commit } = useStore()
    const $q = useQuasar()

    const user = computed(() => state.user.user)
    const voices = computed(() => state.broadcast.ttsVoices)
    const error = ref('')
    const messages = ref([])
    // const mode = ref('create')
    const selectedMessage = ref(null)
    const message = ref({
      type: 'global',
      user_id: user.value.email,
      name: '',
      rate: 200,
      voice: null,
      text: ''
    })

    async function getTtsList () {
      $q.loading.show()
      const r = await api.get(`/broadcast/tts/list?user_id=${user.value.email}`)
      console.log(r)
      messages.value = r.data
      $q.loading.hide()
      console.log(messages.value)
    }

    async function fnSaveMessage () {
      if (!message.value.name) return error.value = '이름을 입력하세요.'
      if (!message.value.voice) return error.value = 'Voice를 선택하세요.'
      $q.loading.show()
      const msg = {
        type: message.value.type,
        user_id: user.value.email,
        name: message.value.name,
        rate: message.value.rate,
        voice: message.value.voice,
        text: message.value.text
      }
      const r = await api.post('/broadcast/tts/list', msg)
      
      if (r) {
        await getTtsList()
        clear()
      }
      $q.loading.hide()
    }

    async function fnEditMessage () {
      if (!message.value.name) return error.value = '이름을 입력하세요.'
      if (!message.value.voice) return error.value = 'Voice를 선택하세요.'
      $q.loading.show()
      const r = await api.put('/broadcast/tts/list', message.value)
      if (r) {
        await getTtsList()
        clear()
      }
      $q.loading.hide()
    }


    async function fnSelectMessage (msg) {
      message.value = { ...msg }
    }

    function clear () {
      message.value = {
        type: 'global',
        name: '',
        text: '',
        user_id: user.value.email
      }
    }

    async function fnDeleteMsg (item) {
      $q.dialog({
        title: '<svg class="text-red" style="height: 32px; width: 32px; margin: 0px 10px -12px 0;"><use xlink:href="icons.svg#exclamation"></use></svg><span>메시지 삭제</span>',
        message: `다음 메시지를 삭제 하시겠습니까? <br>Name: <strong>${item.name}</strong>`,
        html: true,
        cancel: true,
        persistent: true
      }).onOk(async () => {
        $q.loading.show()
        await api.get(`broadcast/tts/deleteList?id=${item._id}`)
        await getTtsList()
        $q.loading.hide()
      })      
    }

    async function ttsPreview () {
      error.value = ''
      if (!message.value.voice) {
        return error.value = 'Voice를 선택해 주세요.'
      }
      const r = await api.post('/broadcast/tts/preview', message.value)
      console.log(r)
      if (r.status === 200) {
        commit('broadcast/setPreview', true)
        commit('broadcast/updatePreviewFile', {
          name: 'TTS Preview',
          src: r.data.src,
          base: 'temp'
        })
      }
    }

    async function fnSelect () {
      commit('broadcast/updateTtsName', selectedMessage.value.name)
      commit('broadcast/updateTtsRate', selectedMessage.value.rate)
      commit('broadcast/updateTtsVoice', selectedMessage.value.voice)
      commit('broadcast/updateTtsText', selectedMessage.value.text)
    }

    onMounted(() => {
      getTtsList()
    })
    return {
      error,
      voices,
      message,
      selectedMessage,
      messages,
      fnSaveMessage,
      fnEditMessage,
      fnSelectMessage,
      fnDeleteMsg,
      ttsPreview,
      fnSelect
    }
  }
}
</script>
