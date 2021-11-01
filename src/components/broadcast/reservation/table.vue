<template>
  <q-card class="card-full">
    <q-card-section>
      <q-table
        flat
        :columns="[
          { name: 'repeat', label: '반복', field: 'repeat', sortable: true, align: 'center' },
          { name: 'start', label: '시작시간', field: 'start', sortable: true, align: 'center' },
          { name: 'name', label: '예약명', field: 'name', sortable: true, align: 'center' },
          { name: 'mode', label: '모드', field: 'mode', sortable: true, align: 'center' },
          { name: 'file', label: '재생파일', field: 'file', align: 'center' },
          { name: 'active', label: '동작', field: 'active', sortable: true, align: 'center' },
          { name: 'actions', label: '기능', align: 'center'}
        ]"
        :rows="schedules"
      >
        <template #body="props">
          <q-tr :props="props">
            <!-- 반복 -->
            <q-td
              key="repeat"
              :props="props"
            >
              {{ props.row.repeat }}
            </q-td>

            <!-- 시작시간 -->
            <q-td
              key="start"
              :props="props"
            >
              <div v-if="props.row.start">
                {{ props.row.start }}
              </div>
              <div v-else>
                <div v-if="props.row.repeat === '한번'">
                  {{ props.row.date }}
                </div>
                <div v-else>
                  <div>
                    {{ props.row.time }}
                  </div>
                  <div v-if="props.row.repeat === '매주'">
                    {{ props.row.week.map(e => e.label).join(',') }}
                  </div>
                </div>
              </div>
            </q-td>

            <q-td
              key="name"
              :props="props"
            >
              {{ props.row.name }}
            </q-td>

            <q-td
              key="mode"
              :props="props"
            >
              {{ props.row.mode }}
            </q-td>

            <q-td
              key="file"
              :props="props"
            >
              {{ props.row.file.name }}
            </q-td>

            <q-td
              key="active"
              :props="props"
            >
              <div>
                <q-btn
                  round
                  flat
                  :icon="props.row.active ? 'svguse:icons.svg#check-circle':'svguse:icons.svg#ban'"
                  :color="props.row.active ? 'green':'red'"
                  @click="fnActive(props.row)"
                />
              </div>
            </q-td>

            <!-- actions -->
            <q-td
              key="actions"
              :props="props"
            >
              <div>
                <q-btn
                  round
                  flat
                  size="sm"
                  @click="fnEdit(props.row)"
                >
                  <q-icon
                    name="svguse:icons.svg#pencil-fill"
                    size="xs"
                    color="teal"
                  />
                </q-btn>

                <q-btn
                  round
                  flat
                  size="sm"
                  @click="fnDelete(props.row)"
                >
                  <q-icon
                    name="svguse:icons.svg#trash-fill"
                    size="xs"
                    color="red"
                  />
                </q-btn>
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'
import { api } from '@/boot/axios'
import Schedule from '@components/dialog/broadcast/schedule'
import Delete from '@components/dialog/delete'
import Default from '@components/dialog/default'

export default {
  setup() {
    const { state, dispatch } = useStore()
    const $q = useQuasar()

    const schedules = computed(() => state.broadcast.schedules)

    function fnEdit(item) {
      $q.dialog({
        component: Schedule,
        componentProps: { item: item }
      }).onOk(async (rt) => {
        $q.loading.show()
        try {
          await api.put('/broadcast/schedules', rt)
          await dispatch('broadcast/updateSchedules')
        } catch (err) {
          console.error(err)
        }
        $q.loading.hide()
      })
    }

    function fnDelete(item) {
      $q.dialog({
        component: Delete,
        componentProps: { item: item }
      }).onOk(async (rt) => {
        $q.loading.show()
        try {
          await api.post('/broadcast/schedules/delete', rt)
          await dispatch('broadcast/updateSchedules')
        } catch (err) {
          console.error(err)
        }
        $q.loading.hide()
      })
    }

    function fnActive(item) {
      $q.dialog({
        component: Default,
        componentProps: { message: '동작상태를 변경하시겠습니까?'},
        cancel: true
      }).onOk(async () => {
        $q.loading.show()
        try {
          await api.get(`/broadcast/schedules/active?id=${item._id}&value=${!item.active}`)
          await dispatch('broadcast/updateSchedules')
        } catch (err) {
          console.error(err)
        }
        $q.loading.hide()
      })
    }

    onMounted(async () => {
      $q.loading.show()
      await dispatch('broadcast/updateSchedules')
      $q.loading.hide()
    })
    return {
      schedules,
      fnEdit,
      fnDelete,
      fnActive
    }
  }
}
</script>
