<template>
  <q-card style="border-radius: 2rem; width: 24rem;">
    <q-card-section class="q-pa-none" style="overflow: hidden;">
      <q-img src="/background/cover_1.png" style="height: 6rem;">
        <div class="fit">
          <div class="q-ml-sm fit row items-center">
            <q-icon name="svguse:icons.svg#users" size="sm" color="cyan-4" />
            <span class="q-ml-md name">사용자 수정</span>
          </div>
        </div>
      </q-img>
    </q-card-section>
    <q-card-section>
      <q-list class="q-ml-md">
          <q-item>
            <q-item-section>
              <q-item-label class="text-bold">사용자 ID</q-item-label>
              <q-item-label>{{ user.userId }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-bold">사용자 이름</q-item-label>
              <q-item-label>{{ user.userName }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-bold">이메일</q-item-label>
              <q-item-label>{{ user.email }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-bold">사용자 등급</q-item-label>
              <q-item-label>{{ user.userLevel }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-bold">관리자</q-item-label>
              <q-item-label class="text-uppercase">{{ user.admin }}</q-item-label>
            </q-item-section>
          </q-item>
          <!-- <q-item>
            <q-item-section>
              <q-item-label class="text-bold">TTS 권환</q-item-label>
              <q-item-label class="text-uppercase">{{ user.tts }}</q-item-label>
            </q-item-section>
          </q-item> -->
          <q-item>
            <q-item-section>
              <q-item-label class="text-bold">로그인 횟수</q-item-label>
              <q-item-label class="text-uppercase">{{ user.numberOfLogin }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-bold">가입일</q-item-label>
              <q-item-label class="text-uppercase">{{ timeFormat(user.createdAt) }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-bold">마지막 로그인 시간</q-item-label>
              <q-item-label class="text-uppercase">{{ timeFormat(user.loginAt) }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
    </q-card-section>
  </q-card>
</template>

<script>
import timeFormat from '@api/timeFormat'
export default {
  props: ['user'],
  setup (props, { emit }) {
    return {
      timeFormat
    }
  }
}
</script>
