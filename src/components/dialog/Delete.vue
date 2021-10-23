<template>
  <!-- notice dialogRef here -->
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
  >
    <q-card class="q-dialog-plugin">
      <!--
        ...content
        ... use q-card-section for it?
      -->
      <q-card-section class="bg-grey-1">
        <div class="row items-center q-gutter-md">
          <q-avatar
            color="red-1"
            text-color="red"
            size="md"
          >
            <q-icon
              name="svguse:icons.svg#exclamation"
              color="red"
              size="1.5rem"
            />
          </q-avatar>
          <div style="font-size: 1.2rem;">
            삭제
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="q-mx-md q-mt-lg">
          <div v-if="item">
            <div>
              다음 내용을 삭제 하시겠습니까?
            </div>
            <br>
            <div v-if="item.index">
              인덱스: <strong>{{ item.index }}</strong>
            </div>
            <div v-if="item.id">
              ID: {{ item.id }}
            </div>
            <div v-if="item.name">
              이름: <strong>{{ item.name }}</strong>
            </div>
            <div v-if="item.email">
              이메일: <strong>{{ item.email }}</strong>
            </div>
            <div v-if="item.ipaddress">
              아이피: <strong>{{ item.ipaddress }}</strong>
            </div>
            <!-- schedule -->
            <div v-if="item.repeat">
              <div>
                반복: <strong>{{ item.repeat }}</strong>
              </div>
              <div>
                <div v-if="item.repeat === '한번'">
                  시간: <strong>{{ item.date }}</strong>
                </div>
                <div v-else>
                  <div>시간:<strong>{{ item.time }}</strong></div>
                  <div v-if="item.repeat === 'week'">
                    요일: {{ item.week.join(',') }}
                  </div>
                </div>
              </div>
              <div>
                삭제 후에는 복구가 불가능 합니다. 다시 한번 확인 해주세요.
              </div>
            </div>
          </div>
          <!-- message -->
          <div
            v-if="message"
            class="text-center"
          >
            <strong>{{ message }}</strong>
          </div>
        </div>
      </q-card-section>

      <!-- buttons example -->
      <q-card-actions align="right">
        <div class="q-mx-sm q-gutter-sm">
          <q-btn
            label="취소"
            rounded
            unelevated
            @click="onCancelClick"
          />
          <q-btn
            color="negative"
            label="확인"
            unelevated
            rounded
            @click="onOKClick(item)"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent } from 'quasar'

export default {
  props: {
    item: Object,
    message: String,
  },

  emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits
  ],

  setup () {
    // REQUIRED; must be called inside of setup()
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
    // dialogRef      - Vue ref to be applied to QDialog
    // onDialogHide   - Function to be used as handler for @hide on QDialog
    // onDialogOK     - Function to call to settle dialog with "ok" outcome
    //                    example: onDialogOK() - no payload
    //                    example: onDialogOK({ /*.../* }) - with payload
    // onDialogCancel - Function to call to settle dialog with "cancel" outcome

    return {
      // This is REQUIRED;
      // Need to inject these (from useDialogPluginComponent() call)
      // into the vue scope for the vue html template
      dialogRef,
      onDialogHide,

      // other methods that we used in our vue html template;
      // these are part of our example (so not required)
      onOKClick (item) {
        // on OK, it is REQUIRED to
        // call onDialogOK (with optional payload)
        onDialogOK(item)
        // or with payload: onDialogOK({ ... })
        // ...and it will also hide the dialog automatically
      },

      // we can passthrough onDialogCancel directly
      onCancelClick: onDialogCancel
    }
  }
}
</script>