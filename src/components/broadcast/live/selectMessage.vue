<template>
  <q-card
    class="card-large"
    style="max-width: 1200px;width: 800px;"
  >
    <q-card-section class="q-pa-none">
      <div class="backr">
        <div class="card-name-align">
          <div class="card-name">
            <q-icon
              class="q-ml-md"
              name="list"
              color="primary"
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
        <div class="col-6">
          <div class="listname">
            메시지를 선택하세요
          </div>
          <q-scroll-area style="height: 24rem;">
            <q-list>
              <q-item
                v-for="message in messages"
                :key="message._id"
                v-ripple
                class="q-mr-md"
                clickable
                :active="message === selectedMessage"
                active-class="active-link"
                @click="selectedMessage=message"
              >
                <q-item-section avatar>
                  <q-icon name="list_alt" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>
                    {{ message.name }}
                  </q-item-label>
                  <q-item-label caption>
                    {{ message.type }}
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
                      @click.stop.prevent="fnEditMessage(message)"
                    />
                    <q-btn
                      flat
                      round
                      size="sm"
                      color="red"
                      icon="delete"
                      @click.stop.prevent="openDelete=true;deleteMsg=message"
                    />
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>
        </div>

        <!-- 오른쪽창 -->
        <div class="col-6 q-gutter-md">
          <div
            v-if="error"
            class="errorMsg"
          >
            {{ error }}
          </div>
          <div class="listname">
            모드
          </div>
          <q-option-group
            v-model="editMessage.type"
            :options="[
              { label: 'Global', value: 'global' },
              { label: 'Private', value: 'private' }
            ]"
            color="primary"
            inline
          />
          <div class="listname">
            메시지
          </div>
          <q-input
            v-model="editMessage.name"
            dense
            outlined
            rounded
            placeholder="메시지 이름"
          />
          <q-input
            v-model="editMessage.text"
            filled
            type="textarea"
            placeholder="TTS 메시지"
          />
          <div class="row justify-end">
            <q-btn
              rounded
              unelevated
              label="미리듣기"
            />
            <q-btn
              class="q-ml-md"
              rounded
              unelevated
              color="primary"
              label="저장하기"
              @click="saveMessage"
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
        @click="onSubmit"
      />
    </q-card-actions>
  </q-card>

  <!-- delete -->
  <q-dialog v-model="openDelete">
    <q-card
      class="card_small"
      style="width: 20rem;"
    >
      <q-card-section class="q-pa-none">
        <div class="backg">
          <div class="q-pl-md card-name-align">
            <div class="card-name">
              <q-icon
                name="delete"
                color="red"
              />
              <div>
                메시지 삭제
              </div>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="text-grey-8">
          이름: <strong>{{ deleteMsg.name }}</strong> 이 메시지를 삭제하시겠습니까?
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          v-close-popup
          style="width: 6rem; height: 2rem;"
          flat
          rounded
          label="닫기"
        />
        <q-btn
          v-close-popup
          style="width: 6rem; height: 2rem;"
          unelevated
          color="red"
          rounded
          label="삭제"
          @click="fnDeleteMsg"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
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
    const error = ref('')
    const messages = ref([])
    // const mode = ref('create')
    const selectedMessage = ref(null)
    const editMessage = ref({
      type: 'global',
      name: '',
      text: '',
      user_id: user.value.email
    })
    const deleteMsg = ref(null)
    const openDelete = ref(false)

    async function getTtsList () {
      $q.loading.show()
      const r = await api.get(`/broadcast/tts?user_id=${user.value.email}`)
      console.log(r)
      messages.value = r.data
      $q.loading.hide()
      console.log(messages.value)
    }

    async function saveMessage () {
      $q.loading.show()
      let r
      if (editMessage.value._id) {
        r = await api.put('/broadcast/tts', editMessage.value)
      } else {
        r = await api.post('/broadcast/tts', editMessage.value)
      }
      clear()
      if (r) {
        await getTtsList()
      }
      $q.loading.hide()
    }

    async function fnEditMessage (message) {
      console.log(message)
      editMessage.value = message
      console.log(editMessage)
    }

    function clear () {
      editMessage.value = {
        type: 'global',
        name: '',
        text: '',
        user_id: user.value.email
      }
    }

    async function fnDeleteMsg () {
      $q.loading.show()
      await api.get(`broadcast/tts/delete?id=${deleteMsg.value._id}`)
      await getTtsList()
      $q.loading.hide()
    }

    async function onSubmit () {
      commit('broadcast/updateTts', selectedMessage.value)
    }

    onMounted(() => {
      getTtsList()
    })
    return {
      error,
      editMessage,
      selectedMessage,
      messages,
      openDelete,
      deleteMsg,
      saveMessage,
      fnEditMessage,
      fnDeleteMsg,
      onSubmit
    }
  }
}
</script>

<style scoped>
.backr {
  height: 6rem;
  color: #fff;
  z-index: 1;
  background: linear-gradient(127deg, rgba(200, 0, 0, 0.8), rgba(255,0,0,0) 60.71%),
              linear-gradient(227deg, rgba(0,200,0,.8), rgba(0,255,0,0) 70.71%),
              linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 99%);
}
.backg {
  height: 6rem;
  color: #fff;
  z-index: 1;
  background: linear-gradient(127deg, rgba(0,100,0,.8), rgba(0,255,0,0) 90.71%),
              linear-gradient(227deg, rgba(200, 0, 0, 0.8), rgba(255,0,0,0) 70.71%),
              linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 99%);
}
</style>